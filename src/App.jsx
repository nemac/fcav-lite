// App.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, LayersControl, ZoomControl } from 'react-leaflet';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  CircularProgress,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Drawer,
  IconButton,
} from '@mui/material';
import { ImageOutlined, LayersOutlined, Menu as MenuIcon } from '@mui/icons-material';
import 'leaflet/dist/leaflet.css';

// Import the pre-generated file list
import { s3FileList } from './s3Files';

// Base URL for the COG tile service
const tileServiceBaseUrl =
  'https://le454ava0m.execute-api.us-east-1.amazonaws.com/cog/tiles/WebMercatorQuad/{z}/{x}/{y}';
const bucketName = 'efetac-test';

const S3Explorer = () => {
  // Combine state into a single state object to reduce useState calls
  const [state, setState] = useState({
    loading: true,
    drawerOpen: true,
    selectedDisplay: 'list',
    files: [],
    selectedLayers: {},
  });

  // Initialize on mount
  useEffect(() => {
    // Initialize from pre-generated file list
    const files = s3FileList;

    // Create a map of files to their selection state (all initially false)
    const selectedLayers = files.reduce((acc, file) => {
      acc[file] = false;
      return acc;
    }, {});

    setState((prevState) => ({
      ...prevState,
      files,
      selectedLayers,
      loading: false,
    }));
  }, []);

  // Toggle layer visibility - now updates active count within the same state update
  const handleLayerToggle = (file) => {
    setState((prevState) => {
      const newSelectedLayers = {
        ...prevState.selectedLayers,
        [file]: !prevState.selectedLayers[file],
      };

      return {
        ...prevState,
        selectedLayers: newSelectedLayers,
      };
    });
  };

  // Helper function to get active layer count
  const getActiveLayerCount = () => {
    return Object.values(state.selectedLayers).filter(Boolean).length;
  };

  // Generate TileLayer URL for a specific file
  const generateTileLayerUrl = (filePath) => {
    const s3Url = `https://${bucketName}.s3.us-east-1.amazonaws.com/${filePath}`;
    const encodedS3Url = encodeURIComponent(s3Url);

    // Base parameters - can be customized based on file type/needs
    return `${tileServiceBaseUrl}?url=${encodedS3Url}`;
  };

  const toggleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      drawerOpen: !prevState.drawerOpen,
    }));
  };

  const handleDisplayChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedDisplay: e.target.value,
    }));
  };

  const activeLayerCount = getActiveLayerCount();
  const { loading, drawerOpen, selectedDisplay, files, selectedLayers } = state;

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            S3 GeoTIFF Explorer - {bucketName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LayersOutlined />
            <Typography
              variant="body1"
              sx={{ ml: 1, mr: 2 }}
            >
              {activeLayerCount} layer{activeLayerCount !== 1 ? 's' : ''} active
            </Typography>
          </Box>
          <FormControl
            variant="outlined"
            size="small"
            sx={{ minWidth: 120, backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <Select
              value={selectedDisplay}
              onChange={handleDisplayChange}
              sx={{ color: 'white' }}
            >
              <MenuItem value="list">List View</MenuItem>
              <MenuItem value="grid">Grid View</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: 350,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 350,
            boxSizing: 'border-box',
            marginTop: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}
          >
            Available Layers ({files.length})
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : selectedDisplay === 'list' ? (
            <List>
              {files.map((file, index) => (
                <ListItem
                  key={index}
                  sx={{ border: '1px solid #eee', mb: 1, borderRadius: 1 }}
                >
                  <ListItemIcon>
                    <ImageOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.split('/').pop()}
                    secondary={file}
                    primaryTypographyProps={{
                      noWrap: true,
                      style: { fontWeight: selectedLayers[file] ? 'bold' : 'normal' },
                    }}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                  <Switch
                    edge="end"
                    checked={selectedLayers[file] || false}
                    onChange={() => handleLayerToggle(file)}
                    inputProps={{ 'aria-labelledby': `layer-${index}` }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Grid
              container
              spacing={2}
            >
              {files.map((file, index) => (
                <Grid
                  item
                  xs={6}
                  key={index}
                >
                  <Paper
                    elevation={selectedLayers[file] ? 8 : 1}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      border: selectedLayers[file] ? '2px solid #3f51b5' : '1px solid #eee',
                      cursor: 'pointer',
                      height: '100%',
                    }}
                    onClick={() => handleLayerToggle(file)}
                  >
                    <ImageOutlined
                      sx={{ fontSize: 40, mb: 1, color: selectedLayers[file] ? '#3f51b5' : 'text.secondary' }}
                    />
                    <Typography
                      noWrap
                      variant="body2"
                    >
                      {file.split('/').pop()}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: drawerOpen ? 'calc(100% - 350px)' : '100%',
          height: '100%',
          mt: '64px',
        }}
      >
        <MapContainer
          center={[35.78, -80.79]} // Centered on North Carolina
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />

          {/* Base map layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Dynamic layers from S3 */}
          <LayersControl position="topright">
            {Object.entries(selectedLayers).map(
              ([file, isSelected], index) =>
                isSelected && (
                  <LayersControl.Overlay
                    key={index}
                    checked={true}
                    name={file.split('/').pop()}
                  >
                    <TileLayer
                      url={generateTileLayerUrl(file)}
                      attribution={`Data from ${bucketName}: ${file}`}
                    />
                  </LayersControl.Overlay>
                )
            )}
          </LayersControl>
        </MapContainer>
      </Box>
    </Box>
  );
};

export default S3Explorer;
