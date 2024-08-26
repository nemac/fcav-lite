const wmsUrl = 'https://mapserver.nemac.org/?map=/etc/mapserver/ecs_test_map_files/';
const wmsUrlFull = 'https://mapserver.nemac.org/?map=/etc/mapserver/ecs_test_map_files/mapserver.map';
export const config = {
  wmsUrl: wmsUrl,
  wmsUrlFull: wmsUrlFull,
  agolApiKey: 'AAPK961d021a9f344f7c95eaadbeb6c6f39ajXC7QTZMufrPPCzqo0NN_ta6FKKzOb8GDutDr1ipDWZMVMPT-Mgy4CNcnKIXJTdu',
  mapCenter: [26.9517, -82.4588],
  mapZoom: 7,
  projectName: 'New FCAV',
  playSpeeds: { // in milliseconds
    '1x': 2000,
    '2x': 1000,
    '4x': 500,
  },
  wmsLayers: {
    'FW3 1 year': {
      name: 'FW3 1 year',
      url: wmsUrl.concat('forwarn3_products_1yr.map'),
      layer_regex: /^forwarn3_products_1yr_(\d{4})(\d{2})(\d{2})$/
    },
    'forwarn3_products_1yr': {
      name: 'forwarn3_products_1yr',
      url: wmsUrl.concat('test_runtime_sub.map'),
      layer_regex: /^forwarn3_products_1yr_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 2 year Early Detect': {
      name: 'FW3 2 year Early Detect',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_2yrED_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 2 year Early Early Detect': {
      name: 'FW3 2 year Early Early Detect',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_2yrEED_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 3 year': {
      name: 'FW3 3 year',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_3yr_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 5 year': {
      name: 'FW3 5 year',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_5yr_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Adapative Baseline All Years': {
      name: 'FW3 Adapative Baseline All Years',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_adaptivebaseline_allyr_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Adaptive Baseline Days Diff': {
      name: 'FW3 Adapative Baseline Days Diff',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_adaptivebaseline_daysdiff_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Early Detect': {
      name: 'FW3 Early Detect',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_ED_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Early Early Detect': {
      name: 'FW3 Early Early Detect',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_EED_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Phenoregions Early Detect': {
      name: 'FW3 Phenoregions Early Detect',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_phenoregionED_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Phenoregions Early Early Detect': {
      name: 'FW3 Phenoregions Early Early Detect',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_phenoregionEED_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Phenoregions Baseline': {
      name: 'FW3 Phenoregions Baseline',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_phenoregions_baseline_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Phenoregions Regional Only': {
      name: 'FW3 Phenoregions Regional Only',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_phenoregions_regionalonly_(\d{4})(\d{2})(\d{2})$/
    },
    'FW3 Phenoregions Seasonal Progress': {
      name: 'FW3 Phenoregions Seasonal Progress',
      url: wmsUrl,
      layer_regex: /^forwarn3_products_phenoregions_seasonalprogress_(\d{4})(\d{2})(\d{2})$/
    },
    'Net Ecological 0 Year': {
      name: 'Net Ecological 0 Year',
      url: wmsUrl,
      layer_regex: /^net_ecological_impact_dev_products_0yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
    'Net Ecological 1 Year': {
      name: 'Net Ecological 1 Year',
      url: wmsUrl,
      layer_regex: /^net_ecological_impact_dev_products_1yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
    'Net Ecological 2 Year': {
      name: 'Net Ecological 2 Year',
      url: wmsUrl,
      layer_regex: /^net_ecological_impact_dev_products_2yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
    'Net Ecological 3 Year': {
      name: 'Net Ecological 3 Year',
      url: wmsUrl,
      layer_regex: /^net_ecological_impact_dev_products_3yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
    'Net Ecological 4 Year': {
      name: 'Net Ecological 4 Year',
      url: wmsUrl,
      layer_regex: /^net_ecological_impact_dev_products_4yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
    'Net Ecological 5 Year': {
      name: 'Net Ecological 5 Year',
      url: wmsUrl,
      layer_regex: /^net_ecological_impact_dev_products_5yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
  },
  vectorLayers: {
    'Current Large Incidents': {
      name: 'Current Large Incidents',
      url: wmsUrl.concat('fire.map'),
      layerName: 'Current-Large-incidents'
    },
    'Tropical Cyclone Lines 2022': {
      name: 'Tropical Cyclone Lines 2022',
      url: wmsUrl.concat('vlayers.map'),
      layerName: 'tropical_cyclone_lines_2022'
    },
    'Tropical Cyclone Lines 2023': {
      name: 'Tropical Cyclone Lines 2023',
      url: wmsUrl.concat('vlayers.map'),
      layerName: 'tropical_cyclone_lines_2023'
    },
    'Tropical Cyclone Lines Since 1980': {
      name: 'Tropical Cyclone Lines Since 1980',
      url: wmsUrl.concat('vector_map_files/tropical_cyclone_lines.map'),
      layerName: 'tropical_cyclone_lines_since_1980'
    }
  },
  masks: {
    'NoMask': {
      name: 'NoMask',
      description: 'No Mask',
    },
    'MaskForForest': {
      name: 'MaskForForest',
      description: 'Mask for Forest',
    },
    'MaskForAgriculture': {
      name: 'MaskForAgriculture',
      description: 'Mask for Agriculture'
    },
    'MaskForConiferForest': {
      name: 'MaskForConiferForest',
      description: 'Mask for Conifer Forest'
    },
    'MaskForDeciduousForest': {
      name: 'MaskForDeciduousForest',
      description: 'Mask for Deciduous Forest'
    },
    'MaskForGrass': {
      name: 'MaskForGrass',
      description: 'Mask for Grass'
    },
    'MaskForMixedForest': {
      name: 'MaskForMixedForest',
      description: 'Mask for Mixed Forest'
    },
    'MaskForNonVegetated': {
      name: 'MaskForNonVegetated',
      description: 'Mask for Non-Vegetated'
    },
    'MaskForShrubland': {
      name: 'MaskForShrubland',
      description: 'Mask for Shrubland'
    },
    'MaskForUrban': {
      name: 'MaskForUrban',
      description: 'Mask for Urban'
    },
    'MaskForWetland': {
      name: 'MaskForWetland',
      description: 'Mask for Wetland'
    }
  },
  basemaps: {
    'ArcGIS Dark Gray': {
      name: 'ArcGIS Dark Gray',
      description: 'ArcGIS Dark Gray',
      basemap: 'arcgis/dark-gray'
    },
    'ArcGIS Light Gray': {
      name: 'ArcGIS Light Gray',
      description: 'ArcGIS Light Gray',
      basemap: 'arcgis/light-gray'
    },
    'ArcGIS Imagery': {
      name: 'ArcGIS Imagery',
      description: 'ArcGIS Imagery',
      basemap: 'arcgis/imagery'
    }
  }
}
