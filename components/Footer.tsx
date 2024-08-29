import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#!" className="text-dark">Link 1</a></li>
              <li><a href="#!" className="text-dark">Link 2</a></li>
              <li><a href="#!" className="text-dark">Link 3</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Contact</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-dark">Email</a></li>
              <li><a href="#!" className="text-dark">Phone</a></li>
              <li><a href="#!" className="text-dark">Address</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Your Company Name
      </div>
    </footer>
  )
}

export default Footer