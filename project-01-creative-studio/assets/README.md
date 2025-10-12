# Assets Folder

This folder contains all the static assets for the My Creative Studio app.

## Required Assets

### App Icons
- `icon.png` - Main app icon (1024x1024)
- `splash.png` - Splash screen image (1242x2436)
- `adaptive-icon.png` - Android adaptive icon (1024x1024)
- `favicon.png` - Web favicon (48x48)

### Placeholder Images
- `placeholder-avatar.png` - Default user avatar
- `placeholder-project.png` - Default project thumbnail
- `placeholder-template.png` - Default template thumbnail

## Asset Specifications

### Icon Requirements
- **Format**: PNG with transparency
- **Size**: 1024x1024 pixels
- **Style**: Flat design with rounded corners
- **Colors**: Use app color scheme (#6366f1 primary)

### Splash Screen Requirements
- **Format**: PNG
- **Size**: 1242x2436 pixels (iPhone X resolution)
- **Content**: App logo centered with brand colors
- **Background**: Solid color matching app theme

### Image Guidelines
- **Quality**: High resolution, optimized for mobile
- **File Size**: Keep under 1MB for performance
- **Format**: PNG for icons, JPG for photos
- **Compression**: Use appropriate compression tools

## Adding New Assets

1. Place new assets in appropriate subfolders
2. Update import statements in components
3. Optimize images for mobile performance
4. Test on different screen densities

## Asset Optimization

- Use vector graphics (SVG) when possible
- Compress images without losing quality
- Consider different screen densities (1x, 2x, 3x)
- Test loading performance on slower devices
