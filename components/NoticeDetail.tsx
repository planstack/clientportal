import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface Notice {
  id: string;
  sentDate: string;
  name: string;
  type: string;
  participants: number;
  confirmationPercentage: number;
  lastStep: string;
  status: 'Active' | 'Complete';
}

const NoticeDetail: React.FC = () => {
  const router = useRouter();
  const { noticeId } = router.query;

  // Mock data for the plan details
  const planDetails = {
    name: 'Acme Corp 401(k) Retirement Plan',
    id: 'PN-1294',
    recordkeeper: 'Fidelity',
    participants: 1500,
    status: 'Active' as const,
  };

  // Mock data for notices
  const notices: Notice[] = [
    { id: '1', sentDate: '2023-05-01', name: 'Annual Notice 2023', type: 'Annual Notice', participants: 1500, confirmationPercentage: 95, lastStep: 'email', status: 'Complete' },
    { id: '2', sentDate: '2023-06-15', name: 'Fund Change Notification', type: 'Fund Change', participants: 1500, confirmationPercentage: 80, lastStep: 'mail', status: 'Active' },
    { id: '3', sentDate: '2023-07-01', name: 'SAR 2022', type: 'SAR', participants: 1450, confirmationPercentage: 75, lastStep: 'email', status: 'Active' },
    { id: '4', sentDate: '2023-08-10', name: 'RMD Notice', type: 'RMD', participants: 50, confirmationPercentage: 100, lastStep: 'text message', status: 'Complete' },
    { id: '5', sentDate: '2023-09-01', name: 'Black Out Period Notice', type: 'Black Out Notice', participants: 1500, confirmationPercentage: 90, lastStep: 'email', status: 'Active' },
  ];

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotices = notices.filter(notice => 
    notice.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTab === 'all' || notice.status.toLowerCase() === activeTab.toLowerCase())
  );

  const getNoticeTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Annual Notice': '#0087d2',
      'SAR': '#6561ac',
      'Fund Change': '#cd004b',
      'Black Out Notice': '#f37023',
      'RMD': '#fcb711',
      'Other': '#0eb24e',
    };
    return colors[type] || '#0eb24e';
  };

  const handleDownload = () => {
    // Implement download functionality here
    console.log('Downloading notices...');
  };

  return (
    <div className="container-fluid">
      <div className="dashboard-card mb-4">
        <div className="row">
          <div className="col-md-3">
            <small className="text-muted">Plan ID</small>
            <p className="mb-0">{planDetails.id}</p>
          </div>
          <div className="col-md-3">
            <small className="text-muted">Plan Name</small>
            <p className="mb-0">{planDetails.name}</p>
          </div>
          <div className="col-md-3">
            <small className="text-muted">Recordkeeper</small>
            <p className="mb-0">{planDetails.recordkeeper}</p>
          </div>
          <div className="col-md-3">
            <small className="text-muted">Participants</small>
            <p className="mb-0">{planDetails.participants.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <h1 className="h2 mb-4">Notices - {planDetails.name}</h1>

      <div className="mb-4">
        <input 
          type="text" 
          className="form-control search-bar" 
          placeholder="Search notices..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="simple-tabs-container">
          <div className="simple-tabs">
            <button 
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} 
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`tab-button ${activeTab === 'active' ? 'active' : ''}`} 
              onClick={() => setActiveTab('active')}
            >
              Active
            </button>
            <button 
              className={`tab-button ${activeTab === 'complete' ? 'active' : ''}`} 
              onClick={() => setActiveTab('complete')}
            >
              Complete
            </button>
          </div>
        </div>
        <button className="btn btn-link" onClick={handleDownload}>
          <i className="bi bi-download"></i>
        </button>
      </div>

      <div className="dashboard-card">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Sent</th>
                <th>Notice Name</th>
                <th>Notice Type</th>
                <th>Participants</th>
                <th>Confirmation %</th>
                <th>Last Step</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.map(notice => (
                <tr key={notice.id}>
                  <td>{notice.sentDate}</td>
                  <td>{notice.name}</td>
                  <td>
                    <span className="badge" style={{ backgroundColor: getNoticeTypeColor(notice.type) }}>
                      {notice.type}
                    </span>
                  </td>
                  <td>{notice.participants}</td>
                  <td>{notice.confirmationPercentage}%</td>
                  <td>{notice.lastStep}</td>
                  <td>
                    <span className={`badge bg-${notice.status === 'Active' ? 'primary' : 'success'}`}>
                      {notice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;