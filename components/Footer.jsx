'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetch('/api/social-links')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then(data => {
        if (data.success) {
          setSocialLinks(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching social links:', error);
      });
  }, []);

  const defaultLinks = [
    { platform: 'About Me', url: '/about' },
    { platform: 'TikTok', url: 'https://tiktok.com' },
    { platform: 'Instagram', url: 'https://instagram.com' },
  ];

  const links = socialLinks.length > 0 ? socialLinks : defaultLinks;

  return (
    <footer className="bg-black py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Image placeholder */}
        <div className="w-16 h-16 mx-auto mb-8 bg-[#FFFF77] rounded-full flex items-center justify-center">
          <span className="text-2xl">🌱</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-8">
              {link.url.startsWith('http') ? (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FFFF77] transition-colors text-sm font-bold"
                >
                  {link.platform}
                </a>
              ) : (
                <Link
                  href={link.url}
                  className="text-white hover:text-[#FFFF77] transition-colors text-sm font-bold"
                >
                  {link.platform}
                </Link>
              )}
              {index < links.length - 1 && (
                <span className="text-white">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}