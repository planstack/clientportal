import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ProfilePopover from './ProfileModal'

const NavItem: React.FC<{ href: string; icon: string; title: string; onClick?: () => void }> = ({ href, icon, title, onClick }) => {
  const router = useRouter()
  const isActive = router.pathname === href || (href === '/' && router.pathname.startsWith('/plan/'))

  return (
    <li className="nav-item">
      <Link href={href} className={`nav-link ${isActive ? 'active' : ''}`} onClick={onClick}>
        <i className={`bi ${icon}`}></i>
        <span className="nav-tooltip">{title}</span>
      </Link>
    </li>
  )
}

const Navbar: React.FC = () => {
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const profileButtonRef = useRef<HTMLAnchorElement>(null);

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowProfilePopover(!showProfilePopover);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setShowProfilePopover(false);
  };

  return (
    <>
      <nav id="sidebarMenu" className="sidebar">
        <div className="sidebar-content">
          <div className="text-center py-4">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          </div>
          <ul className="nav flex-column mt-1 w-100">
            <NavItem href="/" icon="bi-graph-up" title="Reporting" />
            <NavItem href="/billing" icon="bi-wallet2" title="Billing" />
          </ul>
        </div>
        <div className="sidebar-footer">
          <li className="nav-item">
            <a 
              href="#" 
              className="nav-link" 
              onClick={handleProfileClick}
              ref={profileButtonRef}
            >
              <i className="bi bi-person"></i>
              <span className="nav-tooltip">Profile</span>
            </a>
          </li>
        </div>
      </nav>
      <ProfilePopover 
        show={showProfilePopover} 
        onHide={() => setShowProfilePopover(false)} 
        onLogout={handleLogout}
      />
    </>
  )
}

export default Navbar