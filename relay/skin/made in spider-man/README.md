# Made in Spider-Man Relay Skin

A Spider-Man themed Gun-Vue relay server skin. This skin features a modern dark theme design and provides comprehensive internationalization support.

## Features

### Visual Design
- Modern dark theme interface
- Gradient card design
- Responsive layout
- Animated transitions
- Multi-language support (English/Chinese)

### Functionality
- Complete Gun database management interface
- Real-time data synchronization display
- Storage space monitoring
- Configuration management
- Data export/cleanup
- QR code connection sharing

## Technical Implementation

### Server Side (server.js)
1. Data Management
   - Configuration file read/write
   - Storage data export
   - Disk space monitoring
   - Data cleanup functionality

2. System Features
   - Port auto-detection
   - IP address retrieval
   - Performance monitoring
   - Error handling

### Frontend Design (index.html)
1. Interface Components
   - Status indicators
   - Toggle controls
   - Stat cards
   - Language switcher
   - Alert notifications

2. Technology Stack
   - petite-vue framework
   - UnoCSS styling
   - Gun.js database
   - QRCode generation

3. Internationalization
   - English/Chinese bilingual support
   - Real-time language switching
   - Complete translation coverage

## Usage Instructions

1. Install Dependencies:
```bash
npm install
```

2. Configure Server:
- Copy `config.json.example` to `config.json`
- Modify configuration parameters as needed

3. Start Server:
```bash
node server.js
```

4. Access Interface:
- Open browser and visit `http://localhost:8765` (port can be modified in config)

## Custom Configuration

### config.json Options
```json
{
  "store": false,        // Enable persistent storage
  "super": false,        // Enable super user mode
  "version": "0.6.1",    // Version number
  "lastModified": ""     // Last modification time
}
```

## Performance Optimization

1. Interface Performance
- Use petite-vue instead of full Vue framework
- Load external resources on demand
- Optimize CSS animation performance

2. Responsive Optimization
- Mobile-specific styles
- Small screen layout optimization
- Touch event support

## Important Notes

1. Performance Considerations
- Recommended to use modern browsers
- Monitor memory usage during large data synchronization

2. Browser Compatibility
- Supports all modern browsers
- Some animation effects may not be available in older browsers

3. Mobile Usage
- Full mobile support
- Responsive layout adaptation 