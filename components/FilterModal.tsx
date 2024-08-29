import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface FilterModalProps {
  show: boolean;
  onHide: () => void;
  recordkeepers: string[];
  selectedRecordkeepers: string[];
  onApplyFilter: (selected: string[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ show, onHide, recordkeepers, selectedRecordkeepers, onApplyFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<string[]>(selectedRecordkeepers);

  useEffect(() => {
    setSelected(selectedRecordkeepers);
  }, [selectedRecordkeepers]);

  const filteredRecordkeepers = recordkeepers.filter(rk => 
    rk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (recordkeeper: string) => {
    setSelected(prev => 
      prev.includes(recordkeeper)
        ? prev.filter(rk => rk !== recordkeeper)
        : [...prev, recordkeeper]
    );
  };

  const handleApply = () => {
    onApplyFilter(selected);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="filter-modal">
      <Modal.Header closeButton>
        <Modal.Title as="h6">Filter Recordkeepers</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Search recordkeepers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3 search-recordkeepers"
        />
        <div className="recordkeeper-list">
          {filteredRecordkeepers.map(recordkeeper => (
            <Form.Check 
              key={recordkeeper}
              type="checkbox"
              id={`checkbox-${recordkeeper}`}
              label={recordkeeper}
              checked={selected.includes(recordkeeper)}
              onChange={() => handleCheckboxChange(recordkeeper)}
              className="recordkeeper-option"
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" size="sm" onClick={onHide}>Cancel</Button>
        <Button variant="primary" size="sm" onClick={handleApply}>Apply Filter</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;