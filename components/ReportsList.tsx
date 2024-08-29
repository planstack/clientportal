import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Report {
  id: string;
  date: string;
  name: string;
  type: string;
  participants: number;
  confirmationPercentage: number | null;
  lastStep: string | null;
  status: 'Active' | 'Complete';
}

const ReportsList: React.FC = () => {
  const router = useRouter();
  const { planId } = router.query;

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  const reports: Report[] = [
    { id: '1', date: '2023-05-01', name: 'Annual Notice 2023', type: 'Annual Notice', participants: 1500, confirmationPercentage: 95, lastStep: 'email', status: 'Complete' },
    { id: '2', date: '2023-06-15', name: 'Fund Change Notification', type: 'Fund Change', participants: 1500, confirmationPercentage: 80, lastStep: 'mail', status: 'Active' },
    { id: '3', date: '2023-07-01', name: 'SAR 2022', type: 'SAR', participants: 1450, confirmationPercentage: 75, lastStep: 'email', status: 'Active' },
    { id: '4', date: '2023-08-10', name: 'RMD Notice', type: 'RMD', participants: 50, confirmationPercentage: 100, lastStep: 'text message', status: 'Complete' },
    { id: '5', date: '2023-09-01', name: 'Blackout Notice', type: 'Blackout Notice', participants: 1500, confirmationPercentage: 90, lastStep: 'email', status: 'Active' },
    { id: '6', date: '2023-10-15', name: 'Summary Plan Description', type: 'Summary Plan Description', participants: 1500, confirmationPercentage: 85, lastStep: 'mail', status: 'Active' },
    { id: '7', date: '2023-11-01', name: 'Small Balance Force-Out Notice', type: 'Small Balance Force-Out', participants: 100, confirmationPercentage: 70, lastStep: 'email', status: 'Active' },
    { id: '8', date: '2023-12-01', name: 'November Contact Confirmation', type: 'Contact Confirmation', participants: 50, confirmationPercentage: null, lastStep: null, status: 'Complete' },
    { id: '9', date: '2024-01-15', name: 'Annual Notice 2024', type: 'Annual Notice', participants: 1550, confirmationPercentage: 0, lastStep: 'email', status: 'Active' },
    { id: '10', date: '2024-02-01', name: 'Fund Change Notification Q1', type: 'Fund Change', participants: 1550, confirmationPercentage: 60, lastStep: 'email', status: 'Active' },
    { id: '11', date: '2024-03-15', name: 'RMD Notice 2024', type: 'RMD', participants: 75, confirmationPercentage: 80, lastStep: 'mail', status: 'Active' },
    { id: '12', date: '2024-04-01', name: 'SAR 2023', type: 'SAR', participants: 1550, confirmationPercentage: 0, lastStep: 'email', status: 'Active' },
    { id: '13', date: '2024-05-15', name: 'Blackout Notice Q2', type: 'Blackout Notice', participants: 1550, confirmationPercentage: 70, lastStep: 'email', status: 'Active' },
    { id: '14', date: '2024-06-01', name: 'Summary Plan Description Update', type: 'Summary Plan Description', participants: 1550, confirmationPercentage: 50, lastStep: 'mail', status: 'Active' },
    { id: '15', date: '2024-07-15', name: 'Small Balance Force-Out Notice Q3', type: 'Small Balance Force-Out', participants: 80, confirmationPercentage: 90, lastStep: 'email', status: 'Active' },
    { id: '16', date: '2024-08-01', name: 'November Contact Confirmation', type: 'Contact Confirmation', participants: 30, confirmationPercentage: null, lastStep: null, status: 'Complete' },
    { id: '17', date: '2024-09-15', name: 'Fund Change Notification Q3', type: 'Fund Change', participants: 1550, confirmationPercentage: 40, lastStep: 'email', status: 'Active' },
    { id: '18', date: '2024-10-01', name: 'RMD Notice Q4', type: 'RMD', participants: 100, confirmationPercentage: 20, lastStep: 'mail', status: 'Active' },
  ];

  const filteredReports = useMemo(() => {
    return reports.filter(report => 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === 'all' || report.status.toLowerCase() === activeTab.toLowerCase())
    );
  }, [reports, searchTerm, activeTab]);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const getReportTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'Annual Notice': '#0087d2',
      'SAR': '#6561ac',
      'RMD': '#cd004b',
      'Summary Plan Description': '#f37023',
      'Blackout Notice': '#000000',
      'Fund Change': '#0eb24e',
      'Small Balance Force-Out': '#9c27b0',
      'Contact Confirmation': '#795548',
    };
    return colors[type] || '#0eb24e';
  };

  const handleDownload = () => {
    console.log('Downloading reports...');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getLastStepIcon = (lastStep: string | null) => {
    if (lastStep === null) return '';
    const icons: { [key: string]: string } = {
      'email': 'bi-at',
      'mail': 'bi-envelope-fill',
      'text message': 'bi-chat-dots',
    };
    return icons[lastStep] || 'bi-arrow-right-circle';
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getCounts = useMemo(() => {
    const allCount = reports.length;
    const activeCount = reports.filter(report => report.status === 'Active').length;
    const completeCount = reports.filter(report => report.status === 'Complete').length;
    return { allCount, activeCount, completeCount };
  }, [reports]);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="container-fluid">
      <div className="dashboard-header">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
          <h1 className="h2 plans-title">
            <a href="/" onClick={handleBackClick}>
              <i 
                className="bi bi-chevron-left me-2" 
                style={{ color: '#6561ac', cursor: 'pointer' }}
              ></i>
            </a>
            Reports
          </h1>
        </div>

        <div className="mb-4">
          <input 
            type="text" 
            className="form-control search-bar" 
            placeholder="Search reports..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="simple-tabs-container">
          <div className="simple-tabs">
            <button 
              className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} 
              onClick={() => setActiveTab('all')}
            >
              All ({getCounts.allCount})
            </button>
            <button 
              className={`tab-button ${activeTab === 'active' ? 'active' : ''}`} 
              onClick={() => setActiveTab('active')}
            >
              Active ({getCounts.activeCount})
            </button>
            <button 
              className={`tab-button ${activeTab === 'complete' ? 'active' : ''}`} 
              onClick={() => setActiveTab('complete')}
            >
              Complete ({getCounts.completeCount})
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
                <th>DATE</th>
                <th>Report Name</th>
                <th>Report Type</th>
                <th>Participants</th>
                <th>Confirmation %</th>
                <th>Last Step</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map(report => (
                <tr key={report.id}>
                  <td>{formatDate(report.date)}</td>
                  <td>{report.name}</td>
                  <td>
                    <span 
                      className="badge badge-recordkeeper" 
                      style={{ 
                        backgroundColor: getReportTypeColor(report.type),
                        color: report.type === 'Contact Confirmation' ? '#ffffff' : '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '25px',
                        fontWeight: 'normal',
                        fontSize: '12px',
                        display: 'inline-block',
                        textAlign: 'left'
                      }}
                    >
                      {report.type}
                    </span>
                  </td>
                  <td>{report.participants}</td>
                  <td>{report.confirmationPercentage !== null ? `${report.confirmationPercentage}%` : '-'}</td>
                  <td>
                    {report.lastStep && (
                      <>
                        <i className={`bi ${getLastStepIcon(report.lastStep)} me-2`} style={{ color: '#6561ac' }}></i>
                        {report.lastStep}
                      </>
                    )}
                    {!report.lastStep && '-'}
                  </td>
                  <td>
                    <span 
                      className={`badge status-badge bg-${report.status === 'Active' ? 'primary' : 'success'}`}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '25px',
                        fontWeight: 'normal',
                        fontSize: '12px',
                        display: 'inline-block',
                        textAlign: 'left'
                      }}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 pagination-container">
        <div className="page-info">
          Showing {indexOfFirstReport + 1} to {Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length} results
        </div>
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <span className="me-2 page-info">Page {currentPage} of {totalPages}</span>
          <button 
            className="btn btn-outline-primary" 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsList;