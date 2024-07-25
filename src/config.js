const wmsBaseUrl = 'http://load-balancer-dev-947115727.us-east-1.elb.amazonaws.com/'

export const config = {
  agolApiKey: 'AAPK961d021a9f344f7c95eaadbeb6c6f39ajXC7QTZMufrPPCzqo0NN_ta6FKKzOb8GDutDr1ipDWZMVMPT-Mgy4CNcnKIXJTdu',
  mapCenter: [37.0902, -95.7129],
  mapZoom: 6,
  projectName: 'New FCAV',
  playSpeeds: { // in milliseconds
    '1x': 2500,
    '2x': 1250,
    '4x': 625,
  },
  wmsLayers: [
    {
      name: 'Net Ecological 3 Year',
      url: wmsBaseUrl.concat('?map=/etc/mapserver/ecs_test_map_files/mapserver.map'),
      layer_regex: /^net_ecological_impact_dev_products_3yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
    {
      name: 'Net Ecological 4 Year',
      url: wmsBaseUrl.concat('?map=/etc/mapserver/ecs_test_map_files/mapserver.map'),
      layer_regex: /^net_ecological_impact_dev_products_4yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
    {
      name: 'Net Ecological 5 Year',
      url: wmsBaseUrl.concat('?map=/etc/mapserver/ecs_test_map_files/mapserver.map'),
      layer_regex: /^net_ecological_impact_dev_products_5yr_dev_(\d{4})(\d{2})(\d{2})$/
    },
  ]
}
