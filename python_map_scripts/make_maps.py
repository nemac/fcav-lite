import os
import glob
import re

DATA_DIR = "forwarn"
EXCLUDE_DIRS = ["archive", "bill_c", "forwarn2_build_prod", "forwarn2_products",
                "forwarn3_test", "graph_data", "jspruce", "masks", "precursors",
                "rescaled_precursors", "scripts"]
DATA_LOCATION_DIRECTORY = "/etc/mapserver" # where ECS container expects data to be

def extract_date_range(filename):
    # Use a regular expression to find the date range
    match = re.search(r'(\d{4}-\d{2}-\d{2})_(\d{4}-\d{2}-\d{2})', filename)
    if match:
        return match.group(2)
    return None

def extract_subdirs(file_path, base_dir):
    # Get the relative path
    rel_path = os.path.relpath(file_path, base_dir)
    # Split the path into parts
    parts = rel_path.split(os.sep)
    # Return all parts except the last one (filename)
    return os.sep.join(parts[:-1])

def create_layers_from_template(map_template_file, raster_template_file, data_dir):
    with open(map_template_file, 'r', encoding='utf-8') as f:
        map_template = f.read()

    with open(raster_template_file, 'r', encoding='utf-8') as f:
        raster_template = f.read()

    # Get list of .img files
    img_files = [
        f for f in glob.glob(os.path.join(data_dir, '**/*.img'), recursive=True)
        if not any(exclude_dir in f.split(os.sep) for exclude_dir in EXCLUDE_DIRS)
        if "muted" not in os.path.basename(f).lower()
    ]
    # img_files = glob.glob(os.path.join(data_dir, '**/*.img'), recursive=True)
    img_files.sort()

    # Group files by subdirectory
    subdirectory_files = {}
    for absolute_path in img_files:
        subdirs = extract_subdirs(absolute_path, data_dir)
        if subdirs not in subdirectory_files:
            subdirectory_files[subdirs] = []
        subdirectory_files[subdirs].append(absolute_path)

    # Process each subdirectory
    for subdirs, files in subdirectory_files.items():
        layers = []
        layer_filenames = []
        layer_content = raster_template.format(
            layer_name = subdirs.replace(os.sep, '_'),
            group_name = subdirs.replace(os.sep, '_'),
            metadata_name = subdirs.replace(os.sep, '_'),
            data_location = os.path.join(DATA_LOCATION_DIRECTORY, subdirs, "%data%")
        )
        layers.append(layer_content)
        for absolute_path in files:
            filename = os.path.basename(absolute_path)
            layer_filenames.append(filename)
        grouped = [layer_filenames[i:i+1] for i in range(0, len(layer_filenames), 1)]
        final_string = ',\n                                '.join(','.join(group) for group in grouped)
#             date_range = extract_date_range(filename)
#             if date_range:
#                 layer_content = raster_template.format(
#                     layer_name = f"{subdirs.replace(os.sep, '_')}_{date_range.replace('-', '')}",
#                     group_name = subdirs.replace(os.sep, '_'),
#                     metadata_name = f"{subdirs.replace(os.sep, '_')}_{date_range}",
#                     metadata_date = date_range.replace('-', ''),
#                     data_location = os.path.join(DATA_LOCATION_DIRECTORY, absolute_path)
#                 )
#                 layers.append(layer_content)
#                 layer_filenames.append(filename)
#             else:
#                 print(f"Warning: Could not extract date range from {filename}")

        layers_str = "\n".join(layers)
        output_filename = f"{subdirs.replace(os.sep, '_')}.map"
        map_content = map_template.format(layers=layers_str, layer_filenames=final_string, map_file_name=output_filename)
        with open(output_filename, 'w', encoding='utf-8') as f:
            f.write(map_content)

        print(f"Created map file: {output_filename}")

MAP_TEMPLATE = "map_template.map"
RASTER_TEMPLATE = "raster_layers_template.map"
create_layers_from_template(MAP_TEMPLATE, RASTER_TEMPLATE, DATA_DIR)
