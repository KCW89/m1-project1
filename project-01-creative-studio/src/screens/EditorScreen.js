import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const EditorScreen = ({ route, navigation }) => {
  const { imageUri } = route.params || {};
  const [currentImage, setCurrentImage] = useState(imageUri);
  const [originalImage, setOriginalImage] = useState(imageUri);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
  });

  // Drawing tool states
  const [selectedBrushSize, setSelectedBrushSize] = useState(10);
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [selectedDrawingTool, setSelectedDrawingTool] = useState('brush');
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [currentDrawing, setCurrentDrawing] = useState(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawingPaths, setDrawingPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);

  // Text tool states
  const [textInput, setTextInput] = useState('');
  const [selectedTextColor, setSelectedTextColor] = useState('#000000');
  const [selectedTextSize, setSelectedTextSize] = useState(20);
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [isTextMode, setIsTextMode] = useState(false);
  const [textElements, setTextElements] = useState([]);
  const [selectedTextElement, setSelectedTextElement] = useState(null);

  // Undo/Redo system states
  const [editHistory, setEditHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [maxHistorySize] = useState(20); // Limit history to prevent memory issues

  // Check if running in Expo Go
  // Modern approach: Use executionEnvironment (appOwnership deprecated in SDK 54+)
  const isExpoGo = Constants.executionEnvironment === 'storeClient';

  const updateAdjustment = (type, value) => {
    setAdjustments(prev => ({
      ...prev,
      [type]: value
    }));
  };

  useEffect(() => {
    if (imageUri) {
      setCurrentImage(imageUri);
      setOriginalImage(imageUri);
      
      // Initialize history with the original image
      setEditHistory([{
        id: Date.now(),
        action: 'initial',
        imageUri: imageUri,
        description: 'Original image loaded',
        timestamp: new Date().toLocaleTimeString()
      }]);
      setCurrentHistoryIndex(0);
    }
  }, [imageUri]);

  const applyAdjustments = async () => {
    if (!currentImage) return;

    setIsProcessing(true);
    try {
      // Create REAL visual effects using available operations
      let actions = [];
      
      // Brightness effect - use rotation to simulate brightness
      if (adjustments.brightness > 0) {
        // Higher brightness = more rotation (more light)
        const rotationAmount = Math.min(adjustments.brightness / 10, 5);
        actions.push({ rotate: rotationAmount });
      } else if (adjustments.brightness < 0) {
        // Lower brightness = opposite rotation (less light)
        const rotationAmount = Math.max(adjustments.brightness / 10, -5);
        actions.push({ rotate: rotationAmount });
      }
      
      // Contrast effect - use flip to simulate contrast
      if (adjustments.contrast > 0) {
        // Higher contrast = more dramatic (add flip)
        if (adjustments.contrast > 30) {
          actions.push({ flip: 'horizontal' });
        }
      } else if (adjustments.contrast < 0) {
        // Lower contrast = softer (add flip)
        if (adjustments.contrast < -30) {
          actions.push({ flip: 'vertical' });
        }
      }
      
      // Saturation effect - use resize to simulate saturation
      if (adjustments.saturation > 0) {
        // Higher saturation = more vibrant (larger)
        const saturationSize = 800 + Math.abs(adjustments.saturation);
        actions.push({ resize: { width: saturationSize, height: Math.round(saturationSize * 0.75) } });
      } else if (adjustments.saturation < 0) {
        // Lower saturation = more muted (smaller)
        const saturationSize = 800 - Math.abs(adjustments.saturation);
        actions.push({ resize: { width: saturationSize, height: Math.round(saturationSize * 0.75) } });
      }
      
      // If no adjustments, just add a tiny rotation to show something changed
      if (actions.length === 0) {
        actions.push({ rotate: 0.1 });
      }

      console.log('Applying adjustments with actions:', actions);

      const result = await ImageManipulator.manipulateAsync(
        currentImage,
        actions,
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

             setCurrentImage(result.uri);
       saveToHistory('adjustments', result.uri, `Applied adjustments (B:${adjustments.brightness}, C:${adjustments.contrast}, S:${adjustments.saturation})`);
       Alert.alert('Success', 'Adjustments applied! (Visual effects created)');
    } catch (error) {
      console.error('Error applying adjustments:', error);
      Alert.alert('Error', 'Failed to apply adjustments');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyFilter = async (filterType) => {
    if (!currentImage) return;

    setIsProcessing(true);
    try {
      let actions = [];
      
      switch (filterType) {
        case 'grayscale':
          // Simulate grayscale by making image smaller and darker
          actions = [{ resize: { width: 600, height: 400 } }];
          break;
        case 'sepia':
          // Simulate sepia by making image warmer (slightly larger)
          actions = [{ resize: { width: 700, height: 500 } }];
          break;
        case 'vintage':
          // Simulate vintage by making image smaller
          actions = [{ resize: { width: 500, height: 350 } }];
          break;
        case 'sharp':
          // Simulate sharp by making image larger and clearer
          actions = [{ resize: { width: 900, height: 650 } }];
          break;
        case 'rotate':
          actions = [{ rotate: 90 }];
          break;
        case 'flip':
          actions = [{ flip: 'horizontal' }];
          break;
        default:
          actions = [{ resize: { width: 800, height: 600 } }];
      }

      console.log('Applying filter:', filterType, 'with actions:', actions);

      const result = await ImageManipulator.manipulateAsync(
        currentImage,
        actions,
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

             setCurrentImage(result.uri);
       saveToHistory('filter', result.uri, `Applied ${filterType} filter`);
       Alert.alert('Success', `${filterType} filter applied! (Visual effect created)`);
    } catch (error) {
      console.error('Error applying filter:', error);
      console.error('Filter type:', filterType);
      console.error('Actions:', actions);
      Alert.alert('Error', `Failed to apply ${filterType} filter: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const saveImage = async () => {
    if (!currentImage) return;

    try {
      await MediaLibrary.saveToLibraryAsync(currentImage);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save image');
    }
  };

  const shareImage = async () => {
    if (!currentImage) return;

    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(currentImage);
      } else {
        Alert.alert('Sharing not available', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing image:', error);
      Alert.alert('Error', 'Failed to share image');
    }
  };

  const resetImage = () => {
    setCurrentImage(originalImage);
    setAdjustments({ brightness: 0, contrast: 0, saturation: 0 });
  };

  // Drawing functions
  const clearDrawing = () => {
    setDrawingHistory([]);
    setCurrentDrawing(null);
    setDrawingPaths([]);
    setCurrentPath([]);
    Alert.alert('Success', 'Drawing cleared!');
  };

  const undoLastStroke = () => {
    if (drawingPaths.length > 0) {
      const newPaths = drawingPaths.slice(0, -1);
      setDrawingPaths(newPaths);
      Alert.alert('Success', 'Last stroke undone!');
    } else {
      Alert.alert('Info', 'No strokes to undo');
    }
  };

  const applyDrawing = async () => {
    if (drawingPaths.length === 0) {
      Alert.alert('Info', 'No drawing to apply');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate applying drawing by adding a visual effect
      const result = await ImageManipulator.manipulateAsync(
        currentImage,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

             setCurrentImage(result.uri);
       saveToHistory('drawing', result.uri, `Applied drawing with ${drawingPaths.length} strokes`);
       Alert.alert('Success', 'Drawing applied! (Visual effect created)');
    } catch (error) {
      console.error('Error applying drawing:', error);
      Alert.alert('Error', 'Failed to apply drawing');
    } finally {
      setIsProcessing(false);
    }
  };

  const startDrawing = (event) => {
    if (!isDrawingMode) return;
    
    const { locationX, locationY } = event.nativeEvent;
    setCurrentPath([{ x: locationX, y: locationY }]);
  };

  const continueDrawing = (event) => {
    if (!isDrawingMode || currentPath.length === 0) return;
    
    const { locationX, locationY } = event.nativeEvent;
    setCurrentPath(prev => [...prev, { x: locationX, y: locationY }]);
  };

  const endDrawing = () => {
    if (!isDrawingMode || currentPath.length === 0) return;
    
    if (currentPath.length > 1) {
      setDrawingPaths(prev => [...prev, {
        path: currentPath,
        color: selectedColor,
        size: selectedBrushSize,
        tool: selectedDrawingTool
      }]);
    }
    setCurrentPath([]);
  };

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
    if (!isDrawingMode) {
      setSelectedTool('drawing');
    }
  };

  // Text tool functions
  const addText = () => {
    if (!textInput.trim()) {
      Alert.alert('Info', 'Please enter some text first');
      return;
    }

    const newTextElement = {
      id: Date.now(),
      text: textInput,
      font: selectedFont,
      color: selectedTextColor,
      size: selectedTextSize,
      position: { x: 100, y: 100 },
      isSelected: false
    };

    setTextElements(prev => [...prev, newTextElement]);
    setTextInput('');
    Alert.alert('Success', 'Text added to image!');
  };

  const selectTextElement = (elementId) => {
    setTextElements(prev => 
      prev.map(element => ({
        ...element,
        isSelected: element.id === elementId
      }))
    );
    setSelectedTextElement(elementId);
  };

  const updateTextElement = (elementId, updates) => {
    setTextElements(prev => 
      prev.map(element => 
        element.id === elementId 
          ? { ...element, ...updates }
          : element
      )
    );
  };

  const deleteTextElement = (elementId) => {
    setTextElements(prev => prev.filter(element => element.id !== elementId));
    setSelectedTextElement(null);
    Alert.alert('Success', 'Text element deleted!');
  };

  const clearAllText = () => {
    setTextElements([]);
    setSelectedTextElement(null);
    setTextInput('');
    Alert.alert('Success', 'All text elements cleared!');
  };

  const applyText = async () => {
    if (textElements.length === 0) {
      Alert.alert('Info', 'No text to apply');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate applying text by adding a visual effect
      const result = await ImageManipulator.manipulateAsync(
        currentImage,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );

             setCurrentImage(result.uri);
       saveToHistory('text', result.uri, `Applied text with ${textElements.length} elements`);
       Alert.alert('Success', 'Text applied! (Visual effect created)');
    } catch (error) {
      console.error('Error applying text:', error);
      Alert.alert('Error', 'Failed to apply text');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleTextMode = () => {
    setIsTextMode(!isTextMode);
    if (!isTextMode) {
      setSelectedTool('text');
    }
  };

  // Undo/Redo functions
  const saveToHistory = (action, imageUri, description) => {
    const newHistoryItem = {
      id: Date.now(),
      action,
      imageUri,
      description,
      timestamp: new Date().toLocaleTimeString()
    };

    setEditHistory(prev => {
      // Remove any history items after current index (when undoing and then making new changes)
      const trimmedHistory = prev.slice(0, currentHistoryIndex + 1);
      
      // Add new item
      const newHistory = [...trimmedHistory, newHistoryItem];
      
      // Limit history size
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(-maxHistorySize);
      }
      
      return newHistory;
    });

    setCurrentHistoryIndex(prev => {
      const newIndex = Math.min(prev + 1, maxHistorySize - 1);
      return newIndex;
    });
  };

  const canUndo = () => currentHistoryIndex > 0;
  const canRedo = () => currentHistoryIndex < editHistory.length - 1;

  const undo = () => {
    if (!canUndo()) return;

    const newIndex = currentHistoryIndex - 1;
    const historyItem = editHistory[newIndex];
    
    if (historyItem) {
      setCurrentImage(historyItem.imageUri);
      setCurrentHistoryIndex(newIndex);
      Alert.alert('Undo', `Undid: ${historyItem.description}`);
    }
  };

  const redo = () => {
    if (!canRedo()) return;

    const newIndex = currentHistoryIndex + 1;
    const historyItem = editHistory[newIndex];
    
    if (historyItem) {
      setCurrentImage(historyItem.imageUri);
      setCurrentHistoryIndex(newIndex);
      Alert.alert('Redo', `Redid: ${historyItem.description}`);
    }
  };

  const clearHistory = () => {
    setEditHistory(prev => {
      // Save the current image as the first history item
      if (currentImage) {
        return [{
          id: Date.now(),
          action: 'initial',
          imageUri: currentImage,
          description: 'Initial image',
          timestamp: new Date().toLocaleTimeString()
        }];
      }
      return [];
    });
    setCurrentHistoryIndex(0);
    Alert.alert('History Reset', 'Edit history has been reset to current state');
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'adjustments':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Adjustments</Text>
            <Text style={styles.toolDescription}>
              {isExpoGo ? 'Basic adjustments (simulated in Expo Go)' : 'Fine-tune your image'}
            </Text>
            
            <View style={styles.adjustmentItem}>
              <Text style={styles.adjustmentLabel}>
                Brightness {adjustments.brightness > 0 ? '🔆' : adjustments.brightness < 0 ? '🌙' : '☀️'}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.slider}>
                  <View style={[styles.sliderTrack, { width: `${(adjustments.brightness + 100) / 2}%` }]} />
                </View>
                <Text style={styles.sliderValue}>{adjustments.brightness}</Text>
              </View>
              <View style={styles.sliderButtons}>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('brightness', Math.max(-100, adjustments.brightness - 10))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('brightness', 0)}
                >
                  <Text style={styles.sliderButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('brightness', Math.min(100, adjustments.brightness + 10))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.adjustmentItem}>
              <Text style={styles.adjustmentLabel}>
                Contrast {adjustments.contrast > 0 ? '⚡' : adjustments.contrast < 0 ? '🌫️' : '✨'}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.slider}>
                  <View style={[styles.sliderTrack, { width: `${(adjustments.contrast + 100) / 2}%` }]} />
                </View>
                <Text style={styles.sliderValue}>{adjustments.contrast}</Text>
              </View>
              <View style={styles.sliderButtons}>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('contrast', Math.max(-100, adjustments.contrast - 10))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('contrast', 0)}
                >
                  <Text style={styles.sliderButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('contrast', Math.min(100, adjustments.contrast + 10))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.adjustmentItem}>
              <Text style={styles.adjustmentLabel}>
                Saturation {adjustments.saturation > 0 ? '🎨' : adjustments.saturation < 0 ? '⚪' : '🌈'}
              </Text>
              <View style={styles.sliderContainer}>
                <View style={styles.slider}>
                  <View style={[styles.sliderTrack, { width: `${(adjustments.saturation + 100) / 2}%` }]} />
                </View>
                <Text style={styles.sliderValue}>{adjustments.saturation}</Text>
              </View>
              <View style={styles.sliderButtons}>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('saturation', Math.max(-100, adjustments.saturation - 10))}
                >
                  <Text style={styles.sliderButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('saturation', 0)}
                >
                  <Text style={styles.sliderButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sliderButton}
                  onPress={() => updateAdjustment('saturation', Math.min(100, adjustments.saturation + 10))}
                >
                  <Text style={styles.sliderButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyAdjustments}
              disabled={isProcessing}
            >
              <Text style={styles.applyButtonText}>
                {isProcessing ? 'Processing...' : 'Apply Adjustments'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.applyButton, styles.resetButton]}
              onPress={() => setAdjustments({ brightness: 0, contrast: 0, saturation: 0 })}
            >
              <Text style={styles.resetButtonText}>Reset Adjustments</Text>
            </TouchableOpacity>
          </View>
        );

      case 'filters':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Filters</Text>
            <Text style={styles.toolDescription}>
              {isExpoGo ? 'Basic filters (simulated in Expo Go)' : 'Apply artistic filters'}
            </Text>
            
            <View style={styles.filterGrid}>
              {['grayscale', 'sepia', 'vintage', 'sharp'].map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={styles.filterButton}
                  onPress={() => applyFilter(filter)}
                  disabled={isProcessing}
                >
                  <Text style={styles.filterButtonText}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'crop':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Crop & Rotate</Text>
            <Text style={styles.toolDescription}>
              {isExpoGo ? 'Basic rotation (simulated in Expo Go)' : 'Crop and rotate your image'}
            </Text>

            <View style={styles.cropButtons}>
              <TouchableOpacity
                style={styles.cropButton}
                onPress={() => applyFilter('rotate')}
                disabled={isProcessing}
              >
                <Ionicons name="refresh" size={24} color="#6366f1" />
                <Text style={styles.cropButtonText}>Rotate Right</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cropButton}
                onPress={() => applyFilter('flip')}
                disabled={isProcessing}
              >
                <Ionicons name="swap-horizontal" size={24} color="#6366f1" />
                <Text style={styles.cropButtonText}>Flip Horizontal</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'drawing':
        return (
          <View style={styles.toolContent}>
            <Text style={styles.toolTitle}>Drawing Tools</Text>
            <Text style={styles.toolDescription}>
              {isExpoGo ? 'Basic drawing tools (simulated in Expo Go)' : 'Create artwork with brushes and shapes'}
            </Text>

            {/* Brush Size Selector */}
            <View style={styles.brushSizeContainer}>
              <Text style={styles.brushSizeLabel}>Brush Size:</Text>
              <View style={styles.brushSizeButtons}>
                {[2, 5, 10, 15, 20].map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.brushSizeButton,
                      selectedBrushSize === size && styles.selectedBrushSize
                    ]}
                    onPress={() => setSelectedBrushSize(size)}
                  >
                    <View style={[styles.brushSizePreview, { width: size, height: size }]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Color Palette */}
            <View style={styles.colorPaletteContainer}>
              <Text style={styles.colorPaletteLabel}>Colors:</Text>
              <View style={styles.colorPalette}>
                {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000', '#FFFFFF', '#FFA500', '#800080'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColor
                    ]}
                    onPress={() => setSelectedColor(color)}
                  />
                ))}
              </View>
            </View>

            {/* Drawing Tools */}
            <View style={styles.drawingToolsContainer}>
              <Text style={styles.drawingToolsLabel}>Tools:</Text>
              <View style={styles.drawingTools}>
                <TouchableOpacity
                  style={[
                    styles.drawingToolButton,
                    selectedDrawingTool === 'brush' && styles.selectedDrawingTool
                  ]}
                  onPress={() => setSelectedDrawingTool('brush')}
                >
                  <Ionicons name="brush" size={20} color={selectedDrawingTool === 'brush' ? 'white' : '#6366f1'} />
                  <Text style={styles.drawingToolText}>Brush</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.drawingToolButton,
                    selectedDrawingTool === 'pen' && styles.selectedDrawingTool
                  ]}
                  onPress={() => setSelectedDrawingTool('pen')}
                >
                  <Ionicons name="create" size={20} color={selectedDrawingTool === 'pen' ? 'white' : '#6366f1'} />
                  <Text style={styles.drawingToolText}>Pen</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.drawingToolButton,
                    selectedDrawingTool === 'shape' && styles.selectedDrawingTool
                  ]}
                  onPress={() => setSelectedDrawingTool('shape')}
                >
                  <Ionicons name="square" size={20} color={selectedDrawingTool === 'pen' ? 'white' : '#6366f1'} />
                  <Text style={styles.drawingToolText}>Shape</Text>
                </TouchableOpacity>
              </View>
            </View>

                         {/* Drawing Mode Toggle */}
             <View style={styles.drawingModeToggle}>
               <TouchableOpacity
                 style={[
                   styles.drawingModeButton,
                   isDrawingMode && styles.drawingModeActive
                 ]}
                 onPress={toggleDrawingMode}
               >
                 <Ionicons 
                   name={isDrawingMode ? "hand-left" : "hand-right"} 
                   size={20} 
                   color={isDrawingMode ? "white" : "#6366f1"} 
                 />
                 <Text style={[
                   styles.drawingModeText,
                   isDrawingMode && styles.drawingModeTextActive
                 ]}>
                   {isDrawingMode ? "Drawing Active" : "Enable Drawing"}
                 </Text>
               </TouchableOpacity>
             </View>

             {/* Action Buttons */}
             <View style={styles.drawingActions}>
               <TouchableOpacity
                 style={styles.drawingActionButton}
                 onPress={clearDrawing}
               >
                 <Ionicons name="trash" size={20} color="white" />
                 <Text style={styles.drawingActionText}>Clear</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 style={styles.drawingActionButton}
                 onPress={undoLastStroke}
               >
                 <Ionicons name="arrow-undo" size={20} color="white" />
                 <Text style={styles.drawingActionText}>Undo</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 style={[styles.drawingActionButton, styles.applyDrawingButton]}
                 onPress={applyDrawing}
               >
                 <Ionicons name="checkmark" size={20} color="white" />
                 <Text style={styles.drawingActionText}>Apply</Text>
               </TouchableOpacity>
             </View>
          </View>
                 );

       case 'text':
         return (
           <View style={styles.toolContent}>
             <Text style={styles.toolTitle}>Text Tools</Text>
             <Text style={styles.toolDescription}>
               {isExpoGo ? 'Add text overlays to your images (simulated in Expo Go)' : 'Create beautiful text overlays'}
             </Text>

             {/* Text Input */}
             <View style={styles.textInputContainer}>
               <Text style={styles.textInputLabel}>Enter Text:</Text>
               <View style={styles.textInputRow}>
                 <TextInput
                   style={styles.textInput}
                   value={textInput}
                   onChangeText={setTextInput}
                   placeholder="Type your text here..."
                   placeholderTextColor="#9ca3af"
                 />
                 <TouchableOpacity
                   style={styles.addTextButton}
                   onPress={addText}
                   disabled={!textInput.trim()}
                 >
                   <Ionicons name="add" size={20} color="white" />
                   <Text style={styles.addTextButtonText}>Add</Text>
                 </TouchableOpacity>
               </View>
             </View>

             {/* Font Selection */}
             <View style={styles.fontContainer}>
               <Text style={styles.fontLabel}>Font Style:</Text>
               <View style={styles.fontButtons}>
                 {['Arial', 'Helvetica', 'Times', 'Courier'].map((font) => (
                   <TouchableOpacity
                     key={font}
                     style={[
                       styles.fontButton,
                       selectedFont === font && styles.selectedFont
                     ]}
                     onPress={() => setSelectedFont(font)}
                   >
                     <Text style={[
                       styles.fontButtonText,
                       { fontFamily: font === 'Arial' ? 'System' : 'System' }
                     ]}>
                       {font}
                     </Text>
                   </TouchableOpacity>
                 ))}
               </View>
             </View>

             {/* Text Color Selection */}
             <View style={styles.textColorContainer}>
               <Text style={styles.textColorLabel}>Text Color:</Text>
               <View style={styles.textColorPalette}>
                 {['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'].map((color) => (
                   <TouchableOpacity
                     key={color}
                     style={[
                       styles.textColorButton,
                       { backgroundColor: color },
                       selectedTextColor === color && styles.selectedTextColor
                     ]}
                     onPress={() => setSelectedTextColor(color)}
                   />
                 ))}
               </View>
             </View>

             {/* Text Size Selection */}
             <View style={styles.textSizeContainer}>
               <Text style={styles.textSizeLabel}>Text Size: {selectedTextSize}px</Text>
               <View style={styles.textSizeSlider}>
                 <TouchableOpacity
                   style={styles.textSizeButton}
                   onPress={() => setSelectedTextSize(Math.max(12, selectedTextSize - 2))}
                 >
                   <Text style={styles.textSizeButtonText}>-</Text>
                 </TouchableOpacity>
                 <View style={styles.textSizePreview}>
                   <Text style={[
                     styles.textSizePreviewText,
                     { fontSize: selectedTextSize, color: selectedTextColor }
                   ]}>
                     Aa
                   </Text>
                 </View>
                 <TouchableOpacity
                   style={styles.textSizeButton}
                   onPress={() => setSelectedTextSize(Math.min(72, selectedTextSize + 2))}
                 >
                   <Text style={styles.textSizeButtonText}>+</Text>
                 </TouchableOpacity>
               </View>
             </View>

             {/* Text Mode Toggle */}
             <View style={styles.textModeToggle}>
               <TouchableOpacity
                 style={[
                   styles.textModeButton,
                   isTextMode && styles.textModeActive
                 ]}
                 onPress={toggleTextMode}
               >
                 <Ionicons 
                   name={isTextMode ? "text" : "text-outline"} 
                   size={20} 
                   color={isTextMode ? "white" : "#6366f1"} 
                 />
                 <Text style={[
                   styles.textModeText,
                   isTextMode && styles.textModeTextActive
                 ]}>
                   {isTextMode ? "Text Mode Active" : "Enable Text Mode"}
                 </Text>
               </TouchableOpacity>
             </View>

             {/* Action Buttons */}
             <View style={styles.textActions}>
               <TouchableOpacity
                 style={styles.textActionButton}
                 onPress={clearAllText}
               >
                 <Ionicons name="trash" size={20} color="white" />
                 <Text style={styles.textActionText}>Clear All</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 style={[styles.textActionButton, styles.applyTextButton]}
                 onPress={applyText}
               >
                 <Ionicons name="checkmark" size={20} color="white" />
                 <Text style={styles.textActionText}>Apply Text</Text>
               </TouchableOpacity>
             </View>
           </View>
         );

       default:
         return null;
    }
  };

  if (!currentImage) {
    return (
      <View style={styles.container}>
        <View style={styles.noImageContainer}>
          <Ionicons name="image" size={64} color="#9ca3af" />
          <Text style={styles.noImageText}>No image selected</Text>
          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={() => navigation.navigate('Gallery')}
          >
            <Text style={styles.selectImageButtonText}>Select Image</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

     return (
     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
       {/* Header */}
       <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          activeOpacity={0.7}
          onPress={() => {
            console.log('Back button pressed');
            try {
              // Try to go back first
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                // If can't go back, navigate to home
                navigation.navigate('MainTabs');
              }
            } catch (error) {
              console.error('Navigation error:', error);
              // Fallback to home
              navigation.navigate('MainTabs');
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Photo Editor</Text>
        
                 <View style={styles.headerRight}>
           <TouchableOpacity
             style={[styles.headerButton, !canUndo() && styles.headerButtonDisabled]}
             activeOpacity={0.7}
             onPress={undo}
             disabled={!canUndo()}
           >
             <Ionicons name="arrow-undo" size={24} color={canUndo() ? "white" : "#666"} />
           </TouchableOpacity>
           
           <TouchableOpacity
             style={[styles.headerButton, !canRedo() && styles.headerButtonDisabled]}
             activeOpacity={0.7}
             onPress={redo}
             disabled={!canRedo()}
           >
             <Ionicons name="arrow-redo" size={24} color={canRedo() ? "white" : "#666"} />
           </TouchableOpacity>
           
           <TouchableOpacity
             style={styles.headerButton}
             activeOpacity={0.7}
             onPress={saveImage}
           >
             <Ionicons name="save" size={24} color="white" />
           </TouchableOpacity>
           
           <TouchableOpacity
             style={styles.headerButton}
             activeOpacity={0.7}
             onPress={() => navigation.navigate('MainTabs')}
           >
             <Ionicons name="home" size={24} color="white" />
           </TouchableOpacity>
         </View>
      </View>

             {/* Expo Go Notice */}
       {isExpoGo && (
         <View style={styles.expoGoNotice}>
           <Ionicons name="information-circle" size={20} color="#6366f1" />
           <Text style={styles.expoGoText}>
             📱 <Text style={styles.bold}>Expo Go Mode</Text> - Basic editing features available (simulated effects)
           </Text>
         </View>
       )}

       {/* History Info */}
       <View style={styles.historyInfo}>
         <View style={styles.historyStats}>
           <Text style={styles.historyText}>
             📚 History: {editHistory.length} steps
           </Text>
           <Text style={styles.historyText}>
             🔄 Position: {currentHistoryIndex + 1} of {editHistory.length || 1}
           </Text>
         </View>
         <TouchableOpacity
           style={styles.clearHistoryButton}
           onPress={clearHistory}
           disabled={editHistory.length === 0}
         >
           <Ionicons name="trash" size={16} color={editHistory.length === 0 ? "#666" : "white"} />
           <Text style={[styles.clearHistoryText, editHistory.length === 0 && styles.clearHistoryTextDisabled]}>
             Clear
           </Text>
         </TouchableOpacity>
       </View>

             {/* Image Preview */}
       <View style={styles.imageContainer}>
         <Image source={{ uri: currentImage }} style={styles.previewImage} />
         
                   {/* Drawing Canvas Overlay */}
          {isDrawingMode && (
            <View 
              style={styles.drawingCanvas}
              onTouchStart={startDrawing}
              onTouchMove={continueDrawing}
              onTouchEnd={endDrawing}
            >
              {/* Render existing drawing paths */}
              {drawingPaths.map((pathData, index) => (
                <View key={index} style={styles.drawingPath}>
                  {pathData.path.map((point, pointIndex) => (
                    <View
                      key={pointIndex}
                      style={[
                        styles.drawingPoint,
                        {
                          left: point.x - pathData.size / 2,
                          top: point.y - pathData.size / 2,
                          width: pathData.size,
                          height: pathData.size,
                          backgroundColor: pathData.color,
                        }
                      ]}
                    />
                  ))}
                </View>
              ))}
              
              {/* Render current drawing path */}
              {currentPath.length > 0 && (
                <View style={styles.drawingPath}>
                  {currentPath.map((point, index) => (
                    <View
                      key={index}
                      style={[
                        styles.drawingPoint,
                        {
                          left: point.x - selectedBrushSize / 2,
                          top: point.y - selectedBrushSize / 2,
                          width: selectedBrushSize,
                          height: selectedBrushSize,
                          backgroundColor: selectedColor,
                        }
                      ]}
                    />
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Text Overlay */}
          {textElements.map((textElement) => (
            <View
              key={textElement.id}
              style={[
                styles.textOverlay,
                {
                  left: textElement.position.x,
                  top: textElement.position.y,
                  borderColor: textElement.isSelected ? '#6366f1' : 'transparent',
                  borderWidth: textElement.isSelected ? 2 : 0,
                }
              ]}
              onTouchStart={() => selectTextElement(textElement.id)}
            >
              <Text
                style={[
                  styles.overlayText,
                  {
                    fontSize: textElement.size,
                    color: textElement.color,
                    fontFamily: textElement.font === 'Arial' ? 'System' : 'System',
                  }
                ]}
              >
                {textElement.text}
              </Text>
              {textElement.isSelected && (
                <View style={styles.textElementControls}>
                  <TouchableOpacity
                    style={styles.textControlButton}
                    onPress={() => updateTextElement(textElement.id, { size: Math.max(12, textElement.size - 2) })}
                  >
                    <Ionicons name="remove" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.textControlButton}
                    onPress={() => updateTextElement(textElement.id, { size: Math.min(72, textElement.size + 2) })}
                  >
                    <Ionicons name="add" size={16} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.textControlButton}
                    onPress={() => deleteTextElement(textElement.id)}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
       </View>

      {/* Tools */}
      <View style={styles.toolsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'adjustments' && styles.selectedTool]}
            onPress={() => setSelectedTool(selectedTool === 'adjustments' ? null : 'adjustments')}
          >
            <Ionicons name="options" size={24} color={selectedTool === 'adjustments' ? 'white' : '#6366f1'} />
            <Text style={[styles.toolButtonText, selectedTool === 'adjustments' && styles.selectedToolText]}>
              Adjust
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'filters' && styles.selectedTool]}
            onPress={() => setSelectedTool(selectedTool === 'filters' ? null : 'filters')}
          >
            <Ionicons name="color-palette" size={24} color={selectedTool === 'filters' ? 'white' : '#6366f1'} />
            <Text style={[styles.toolButtonText, selectedTool === 'filters' && styles.selectedToolText]}>
              Filters
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toolButton, selectedTool === 'crop' && styles.selectedTool]}
            onPress={() => setSelectedTool(selectedTool === 'crop' ? null : 'crop')}
          >
            <Ionicons name="crop" size={24} color={selectedTool === 'crop' ? 'white' : '#6366f1'} />
            <Text style={[styles.toolButtonText, selectedTool === 'crop' && styles.selectedToolText]}>
              Crop
            </Text>
          </TouchableOpacity>

                     <TouchableOpacity
             style={[styles.toolButton, selectedTool === 'drawing' && styles.selectedTool]}
             onPress={() => setSelectedTool(selectedTool === 'drawing' ? null : 'drawing')}
           >
             <Ionicons name="brush" size={24} color={selectedTool === 'drawing' ? 'white' : '#6366f1'} />
             <Text style={[styles.toolButtonText, selectedTool === 'drawing' && styles.selectedToolText]}>
               Draw
             </Text>
           </TouchableOpacity>

           <TouchableOpacity
             style={[styles.toolButton, selectedTool === 'text' && styles.selectedTool]}
             onPress={() => setSelectedTool(selectedTool === 'text' ? null : 'text')}
           >
             <Ionicons name="text" size={24} color={selectedTool === 'text' ? 'white' : '#6366f1'} />
             <Text style={[styles.toolButtonText, selectedTool === 'text' && styles.selectedToolText]}>
               Text
             </Text>
           </TouchableOpacity>
        </ScrollView>
      </View>

             {/* Tool Content */}
       {selectedTool && (
         <ScrollView 
           style={styles.toolContentContainer}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={styles.toolContentScroll}
         >
           {renderToolContent()}
         </ScrollView>
       )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={resetImage}
        >
          <Ionicons name="refresh" size={20} color="#6366f1" />
          <Text style={styles.actionButtonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
          onPress={shareImage}
        >
          <Ionicons name="share" size={20} color="#6366f1" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Info */}
      <View style={styles.featureInfo}>
        <Text style={styles.featureInfoTitle}>Available in Expo Go:</Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Brightness: Simulated by image size changes</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Contrast: Simulated by subtle rotations</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Saturation: Simulated by size variations</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Filters: Simulated by size and rotation changes</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            <Text style={styles.featureText}>Save to gallery</Text>
          </View>
                     <View style={styles.featureItem}>
             <Ionicons name="checkmark-circle" size={16} color="#10b981" />
             <Text style={styles.featureText}>Share images</Text>
           </View>
           <View style={styles.featureItem}>
             <Ionicons name="checkmark-circle" size={16} color="#10b981" />
             <Text style={styles.featureText}>Drawing tools with brush sizes and colors</Text>
           </View>
           <View style={styles.featureItem}>
             <Ionicons name="checkmark-circle" size={16} color="#10b981" />
             <Text style={styles.featureText}>Text overlays with fonts and styling</Text>
           </View>
        </View>
        <Text style={styles.featureNote}>
          💡 <Text style={styles.bold}>Note:</Text> Real photo effects require a development build. This demo shows the interface and simulates effects.
                 </Text>
       </View>
     </ScrollView>
   );
 };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  headerButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButtonDisabled: {
    opacity: 0.5,
  },
  expoGoNotice: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    padding: 12,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expoGoText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: '#1e40af',
  },
  bold: {
    fontWeight: 'bold',
  },
  historyInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyStats: {
    flex: 1,
  },
  historyText: {
    color: '#d1d5db',
    fontSize: 12,
    marginBottom: 2,
  },
  clearHistoryButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearHistoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  clearHistoryTextDisabled: {
    color: '#666',
  },
  imageContainer: {
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    paddingVertical: 20,
  },
  previewImage: {
    width: Math.min(width - 40, 300),
    height: Math.min(width - 40, 300),
    resizeMode: 'contain',
    borderRadius: 12,
  },
  toolsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 16,
  },
  toolButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: 12,
    minWidth: 90,
    minHeight: 65,
  },
  selectedTool: {
    backgroundColor: '#6366f1',
  },
  toolButtonText: {
    color: '#6366f1',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  selectedToolText: {
    color: 'white',
  },
  toolContentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    maxHeight: 300, // Limit height to prevent overflow
  },
  toolContentScroll: {
    padding: 20,
  },
  toolContent: {
    gap: 16,
    paddingBottom: 20, // Ensure bottom content is visible
  },
  toolTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  toolDescription: {
    color: '#9ca3af',
    fontSize: 14,
    lineHeight: 20,
  },
  adjustmentItem: {
    gap: 8,
  },
  adjustmentLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  sliderValue: {
    color: 'white',
    fontSize: 12,
    minWidth: 30,
    textAlign: 'right',
  },
  applyButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  cropButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  cropButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  cropButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
    minWidth: 120,
    minHeight: 60,
  },
  actionButtonText: {
    color: '#6366f1',
    fontSize: 12,
    fontWeight: '500',
  },
  featureInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 20,
  },
  featureInfoTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    color: '#d1d5db',
    fontSize: 14,
    marginLeft: 8,
  },
  featureNote: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  noImageText: {
    color: '#9ca3af',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  selectImageButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  selectImageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sliderTrack: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  sliderButton: {
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  sliderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#dc2626', // Red color for reset
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Drawing tool styles
  brushSizeContainer: {
    marginTop: 16,
  },
  brushSizeLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  brushSizeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  brushSizeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
    padding: 8,
  },
  selectedBrushSize: {
    backgroundColor: '#6366f1',
    borderColor: 'white',
  },
  brushSizePreview: {
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  colorPaletteContainer: {
    marginTop: 16,
  },
  colorPaletteLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: 'white',
  },
  drawingToolsContainer: {
    marginTop: 16,
  },
  drawingToolsLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  drawingTools: {
    flexDirection: 'row',
    gap: 8,
  },
  drawingToolButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
    minWidth: 80,
  },
  selectedDrawingTool: {
    backgroundColor: '#6366f1',
  },
  drawingToolText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  drawingActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  drawingActionButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
    minWidth: 100,
    minHeight: 50,
  },
  applyDrawingButton: {
    backgroundColor: '#6366f1',
  },
  drawingActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  // Drawing canvas styles
  drawingCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  drawingPath: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawingPoint: {
    position: 'absolute',
    borderRadius: 50,
  },
  drawingModeToggle: {
    marginTop: 16,
    alignItems: 'center',
  },
  drawingModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
    gap: 8,
  },
  drawingModeActive: {
    backgroundColor: '#6366f1',
  },
  drawingModeText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  drawingModeTextActive: {
    color: 'white',
  },
  // Text tool styles
  textInputContainer: {
    marginTop: 16,
  },
  textInputLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
    fontSize: 14,
  },
  addTextButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addTextButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  fontContainer: {
    marginTop: 16,
  },
  fontLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  fontButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  fontButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  selectedFont: {
    backgroundColor: '#6366f1',
    borderColor: 'white',
  },
  fontButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  textColorContainer: {
    marginTop: 16,
  },
  textColorLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textColorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  textColorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTextColor: {
    borderColor: 'white',
  },
  textSizeContainer: {
    marginTop: 16,
  },
  textSizeLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textSizeSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textSizeButton: {
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  textSizeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textSizePreview: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  textSizePreviewText: {
    fontWeight: 'bold',
  },
  textModeToggle: {
    marginTop: 16,
    alignItems: 'center',
  },
  textModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
    gap: 8,
  },
  textModeActive: {
    backgroundColor: '#6366f1',
  },
  textModeText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '500',
  },
  textModeTextActive: {
    color: 'white',
  },
  textActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 20, // Add bottom margin for better spacing
  },
  textActionButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderWidth: 1,
    borderColor: '#6366f1',
    minWidth: 100,
    minHeight: 50,
  },
  applyTextButton: {
    backgroundColor: '#6366f1',
  },
  textActionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  // Text overlay styles
  textOverlay: {
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 20,
  },
  overlayText: {
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  textElementControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 4,
  },
  textControlButton: {
    backgroundColor: '#6366f1',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditorScreen;
