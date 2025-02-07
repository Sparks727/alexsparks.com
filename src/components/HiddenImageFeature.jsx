"use client"; // Mark this component as a Client Component

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const HiddenImageFeature = () => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const toggleImage = (event) => {
            if (event.ctrlKey && event.key === 't') {
                const randomTop = Math.random() * (window.innerHeight - 200);
                const randomLeft = Math.random() * (window.innerWidth - 300);
                setPositions((prev) => [...prev, { top: `${randomTop}px`, left: `${randomLeft}px` }]);
            }
        };

        const handleClick = () => {
            setPositions([]);
        };

        document.addEventListener('keydown', toggleImage);
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('keydown', toggleImage);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div>
            <h1 style={{ display: 'none' }}>Press Ctrl + T to see the hidden images</h1>
            {positions.map((position, index) => (
                <Image
                    key={index}
                    id={`hiddenImage-${index}`}
                    src="/images/photos/kasey.png"
                    alt="Hidden Image"
                    width={200}
                    height={100}
                    style={{
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                    }}
                />
            ))}
        </div>
    );
};

export default HiddenImageFeature;