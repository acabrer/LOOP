import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ChevronDown, Upload } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Input, Textarea, Label } from '../common';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log('File selected:', e.target.files[0].name); // Debug log
    }
  };

  const handleUpload = () => {
    console.log('Uploading:', { file, description, tags });
    setIsUploadOpen(false);
    console.log('Is upload open after setting to false:', isUploadOpen); // Debug log
    // Reset form
    setFile(null);
    setDescription('');
    setTags('');
  };

  return (
    <header className="header">
      <div className="logo">Loop</div>
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="What sound are you looking for?" />
      </div>
      <div className="user-menu-container" ref={dropdownRef}>
        <Button onClick={() => {
          console.log('Upload button clicked'); // Debug log
          setIsUploadOpen(true);
        }} className="upload-button">
          <Upload size={18} />
          Upload
        </Button>
        <div className="user-menu" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <User size={18} />
          <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>User</span>
          <ChevronDown size={18} />
        </div>
        {isDropdownOpen && (
          <div className="user-dropdown">
            <a href="/live">Start Live Web</a>
            <a href="/upload">Your Library Upload</a>
            <a href="/analysis">Data Analysis</a>
            <a href="/settings">Settings</a>
          </div>
        )}
      </div>
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        {console.log('Dialog open state:', isUploadOpen)} {/* Debug log */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Content</DialogTitle>
          </DialogHeader>
          <div className="upload-form">
            <div className="form-group">
              <Label htmlFor="file">File</Label>
              <Input id="file" type="file" onChange={handleFileChange} />
            </div>
            <div className="form-group">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="e.g. rock, kick drum, 123bpm"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsUploadOpen(false)}>Cancel</Button>
            <Button onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
