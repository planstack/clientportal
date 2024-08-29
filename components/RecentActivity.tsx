import React from 'react'

const RecentActivity: React.FC = () => {
  return (
    <div className="card">
      <div className="card-header">Recent Activity</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">User John Doe logged in</li>
        <li className="list-group-item">New order #1234 received</li>
        <li className="list-group-item">Product "Widget X" updated</li>
        <li className="list-group-item">User Jane Smith registered</li>
      </ul>
    </div>
  )
}

export default RecentActivity