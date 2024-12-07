import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to="/">
        <svg
          width="140"
          height="55"
          viewBox="0 0 140 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-svg"
        >
          {/* Fond décoratif */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#B8860B', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#B8860B', stopOpacity: 1}} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Motifs arabesques */}
          <path
            d="M10,27 Q35,7 70,27 Q105,47 130,27"
            stroke="url(#goldGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M10,32 Q35,52 70,32 Q105,12 130,32"
            stroke="url(#goldGradient)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.5"
          />

          {/* Texte principal avec effet de dôme */}
          <text
            x="70"
            y="34"
            textAnchor="middle"
            className="logo-text"
            fill="url(#goldGradient)"
            filter="url(#glow)"
            style={{
              fontSize: "32px",
              fontFamily: 'Scheherazade New, serif',
              fontWeight: 'bold'
            }}
          >
            منزل
          </text>

          {/* Texte latin en dessous */}
          <text
            x="70"
            y="48"
            textAnchor="middle"
            fill="#2C3E50"
            style={{
              fontSize: '12px',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '3px'
            }}
          >
            MANZEL
          </text>

          {/* Éléments décoratifs */}
          <circle cx="25" cy="27" r="1" fill="url(#goldGradient)" />
          <circle cx="115" cy="27" r="1" fill="url(#goldGradient)" />
        </svg>
      </Link>
    </div>
  );
};

export default Logo;
