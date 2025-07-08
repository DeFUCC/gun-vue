# Cute Star Relay Skin

A cute star-themed Gun-Vue relay server skin. This skin transforms the relay server interface into an adorable space-themed design filled with stars and cosmic elements.

## Features

### Visual Design
- Starry background animation
- Shooting star animation
- Cosmic-themed card design
- Glowing text and button effects
- Responsive layout design
- Dark mode support

### Functionality
- Complete Gun database management interface
- Real-time data synchronization display
- Storage space monitoring
- QR code connection sharing
- Status indicators
- Toggle controls

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

3. Ollama Integration
   - Native API implementation
   - CLI support
   - Stream response handling
   - Model management

### Frontend Design (index.html)
1. Interface Layout
   - Cosmic style card components
   - Floating stat cards
   - Time display module
   - Status indicators

2. Animation Effects
   - Starry background animation
   - Meteor animation
   - Glowing text effects
   - Card hover effects

3. Responsive Design
   - Mobile optimization
   - Performance optimization
   - Dark mode support

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

1. Animation Performance
- Use CSS transform instead of position animations
- Animation degradation for low-performance devices
- Support for reduced motion mode

2. Responsive Optimization
- Mobile-specific styles
- Small screen layout optimization
- Touch event support

## Important Notes

1. Performance Considerations
- May need to disable some animations on low-performance devices
- Monitor memory usage during large data synchronization

2. Browser Compatibility
- Recommended to use modern browsers
- Some animation effects may not be available in older browsers

3. Mobile Usage
- Use recent versions of mobile browsers
- Some features may have limitations on mobile devices 