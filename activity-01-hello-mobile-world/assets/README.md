# Assets Folder

This folder contains images and other assets for your app.

## Required Assets

### icon.png (1024x1024)
- App icon displayed on device home screen
- Must be 1024x1024 pixels
- PNG format with transparency

### splash.png (2732x2732)
- Splash screen shown when app launches
- Should be 2732x2732 pixels (will be scaled)
- PNG format

### adaptive-icon.png (1024x1024)
- Android adaptive icon
- Foreground image for Android
- PNG format with transparency

### logo.png (200x200)
- Used in App.js as example image
- Can be any size, recommended 200x200
- PNG or JPG format

## Adding Your Own Images

To add custom images:

1. **Copy image to this folder**
   - Example: `my-photo.png`

2. **Reference in code**
   ```javascript
   <Image source={require('./assets/my-photo.png')} />
   ```

3. **Or use web images**
   ```javascript
   <Image source={{ uri: 'https://example.com/image.png' }} />
   ```

## Image Resources

- [Unsplash](https://unsplash.com/) - Free photos
- [Flaticon](https://www.flaticon.com/) - Free icons
- [Picsum Photos](https://picsum.photos/) - Placeholder images

## Notes

- Keep images under 500KB for fast loading
- Use PNG for logos/icons (supports transparency)
- Use JPG for photos (smaller file size)
- Optimize images before adding to project
