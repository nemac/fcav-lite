#!/bin/bash
# generate-s3-files.sh
# This script recursively searches an S3 bucket for .tif and .img files
# and creates a JavaScript file with an array of all matching file paths

# Configure these variables
BUCKET_NAME="efetac-test"
OUTPUT_FILE="src/s3Files.js"

echo "Searching for .tif and .img files in s3://${BUCKET_NAME}..."

# Use AWS CLI to recursively list all objects in the bucket
# Filter for .tif and .img files using grep
# The --recursive flag makes it search through all folders
FILES=$(aws s3 ls "s3://${BUCKET_NAME}/" --recursive | grep -E "\.tif$|\.img$" | awk '{print $4}')

# Create JavaScript file with the file list
echo "// s3Files.js - Generated $(date)" > "${OUTPUT_FILE}"
echo "// List of .tif and .img files in the ${BUCKET_NAME} bucket" >> "${OUTPUT_FILE}"
echo "export const s3FileList = [" >> "${OUTPUT_FILE}"

# Process each file and add it to the array
while read -r file; do
  if [ ! -z "$file" ]; then
    echo "  '${file}'," >> "${OUTPUT_FILE}"
  fi
done <<< "${FILES}"

echo "];" >> "${OUTPUT_FILE}"

echo "File list generated at ${OUTPUT_FILE}"
echo "Found $(grep -c "'" "${OUTPUT_FILE}") files"