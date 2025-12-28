// Install: npm install @emoji-mart/react @emoji-mart/data
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Emojis = ({ onEmojiSelect }) => {
  return (
    <Picker 
      data={data} 
      onEmojiSelect={onEmojiSelect} 
      theme="light" // or "dark" / "auto"
      previewPosition="none" // hides the preview bar at the bottom
      skinTonePosition="none"
    />
  );
};

export default Emojis;