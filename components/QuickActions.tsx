import React, { useState } from 'react'
import AddUserModal from './AddUserModal'

const QuickActions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="card">
        <div className="card-header">Quick Actions</div>
        <div className="card-body">
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="button" onClick={openModal}>Add New User</button>
            <button className="btn btn-secondary" type="button">Create Report</button>
            <button className="btn btn-info" type="button">Send Newsletter</button>
          </div>
        </div>
      </div>
      <AddUserModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default QuickActions