import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// types.ts
export enum Category {
  Computers = 'kompyuterlar',
  Phones = 'telefonlar',
  Accessories = 'aksessuarlar',
  Discounts = 'chegirmalar',
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: Category;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

// constants.ts
const BANNER_SLIDES = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/18338901/pexels-photo-18338901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'Eng arzon narxlar faqat bizda!',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'Yangi texnikalar – kafolat bilan!',
  },
];


const PRODUCTS: Product[] = [
  // Computers
  {
    id: 1,
    name: 'MacBook Air M3',
    price: 15500000,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    category: Category.Computers,
    reviews: [
      { id: 101, author: 'Ali', rating: 5, comment: 'Juda zo\'r noutbuk, ishlashi tez.' },
      { id: 102, author: 'Vali', rating: 4, comment: 'Batareyasi yaxshi ekan.' },
    ],
  },
  {
    id: 2,
    name: 'Asus ROG Strix G16',
    price: 18200000,
    images: [
      'https://images.unsplash.com/photo-1618366712169-56d2b7e16327?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1611078489939-702d5c0f6a2e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    category: Category.Computers,
    reviews: [
        { id: 201, author: 'Sardor', rating: 5, comment: 'O\'yinlar uchun ajoyib tanlov!' },
    ],
  },
  {
    id: 9,
    name: 'Lenovo ThinkPad X1',
    price: 12600000,
    images: [
        'https://images.unsplash.com/photo-1589578236829-216a4f4a3c18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1598449086749-34751b3f0263?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1555203522-0a4f5f541315?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Computers,
    reviews: [
        { id: 901, author: 'Nodir', rating: 5, comment: 'Ish uchun juda qulay va yengil.' },
    ],
  },
  {
    id: 10,
    name: 'Lenovo Legion 5 Pro',
    price: 20500000,
    images: [
        'https://images.unsplash.com/photo-1606220838323-847361a9c4a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1664429092911-c1b0a88ac2b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1647426654054-20a89270e59a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Computers,
    reviews: [
        { id: 1001, author: 'Hasan', rating: 5, comment: 'O\'yinlar uchun ajoyib tanlov. Sovutish tizimi zo\'r ishlaydi.' },
    ],
  },
  // Phones
  {
    id: 3,
    name: 'iPhone 15 Pro Max',
    price: 14500000,
    images: [
        'https://images.unsplash.com/photo-1695026900898-3844d18c9b20?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1695225213693-8fca02d152a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1694500985224-b6d36e84d416?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Phones,
    reviews: [
        { id: 301, author: 'Kamola', rating: 5, comment: 'Kamerasi juda tiniq oladi.' },
    ],
  },
  {
    id: 4,
    name: 'Samsung S24 Ultra',
    price: 13200000,
    images: [
        'https://images.unsplash.com/photo-1707157299066-80bd75aa6f1c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1706200276069-7988d4474775?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1705259042576-8802d3340578?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Phones,
    reviews: [
        { id: 401, author: 'Jamshid', rating: 5, comment: 'Stilusi bilan ishlash qulay.' },
        { id: 402, author: 'Laylo', rating: 4, comment: 'Dizayni chiroyli.' },
    ],
  },
   {
    id: 11,
    name: 'Xiaomi 14 Pro',
    price: 9800000,
    images: [
        'https://images.unsplash.com/photo-1700683226162-a567676646b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1698249873966-234255593850?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1685390959085-b54a3e74367b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Phones,
    reviews: [
        { id: 1101, author: 'Olim', rating: 5, comment: 'Leica kameralari shunchaki daxshat!' },
    ],
  },
  // Accessories
  {
    id: 5,
    name: 'Sony WH-1000XM5 Headphones',
    price: 4000000,
    images: [
      'https://images.unsplash.com/photo-1651036034333-31189c88e99a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1627441544621-3c76a2b89667?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Accessories,
    reviews: [
      { id: 501, author: 'Anvar', rating: 5, comment: 'Shovqinni ajoyib bostiradi.' },
    ],
  },
  {
    id: 6,
    name: 'Logitech MX Master 3S',
    price: 1200000,
    images: [
      'https://images.unsplash.com/photo-1681381952434-2e21b7d159a2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1662944321287-33230a6faf6a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Accessories,
    reviews: [],
  },
  {
    id: 12,
    name: 'Apple AirPods Pro 2',
    price: 3000000,
    images: [
        'https://images.unsplash.com/photo-1606742219952-8c5b36de4a23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1590212151007-3803e481f287?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Accessories,
    reviews: [
        { id: 1201, author: 'Madina', rating: 5, comment: 'Ovoz sifati va shovqinni bosishi eng yuqori darajada.' },
    ],
  },
  {
    id: 13,
    name: 'Apple Watch Series 9',
    price: 5500000,
    images: [
        'https://images.unsplash.com/photo-1579586337278-35d99a418b69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1523180436214-d84a7fe58510?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Accessories,
    reviews: [
        { id: 1301, author: 'Rustam', rating: 5, comment: 'Kundalik hayot uchun juda qulay gadjet.' },
    ],
  },
  // Discounts
  {
    id: 7,
    name: 'Anker Power Bank 20000mAh',
    price: 600000,
    images: [
        'https://images.unsplash.com/photo-1623912474205-0fd11197775f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1588854339120-a354c9a456ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Discounts,
    reviews: [
        { id: 701, author: 'Firdavs', rating: 4, comment: 'Narxiga arziydi.' },
    ],
  },
  {
    id: 8,
    name: 'JBL Go 3 Portable Speaker',
    price: 500000,
    images: [
        'https://images.unsplash.com/photo-1628185183479-735955a5b51e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1628185183492-7fdf0e61143f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Discounts,
    reviews: [
        { id: 801, author: 'Zarina', rating: 5, comment: 'Kichkina bo\'lsa ham, ovozi baland.' },
    ],
  },
  {
    id: 14,
    name: 'Razer Huntsman Mini',
    price: 1100000,
    images: [
        'https://images.unsplash.com/photo-1602837381611-9280a911634b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1636211993219-c12141543789?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: Category.Discounts,
    reviews: [
        { id: 1401, author: 'GamerUz', rating: 5, comment: 'Kichik va tezkor. Geymerlar uchun ayni muddao.' },
    ],
  },
];

// Icons
const CartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);
const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.122 0l8.954 8.955M3 10.5v9A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.5v-9M15.75 21v-6.75A2.25 2.25 0 0013.5 12h-3a2.25 2.25 0 00-2.25 2.25V21" />
  </svg>
);
const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);
const UzcardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 128 40" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="128" height="40" rx="4" fill="#F4F4F4" />
        <path d="M24.8 12h-4.8l-4 16h4.8l.8-3.2h4.8l.8 3.2h4.8l-4-16zm-1.6 10.4l1.6-6.4 1.6 6.4h-3.2zM40 12h-4.8v16H40v-3.2h-1.6v-3.2h1.6v-3.2h-1.6V15.2H40V12zM53.6 12h-4.8l-4 16h4.8l.8-3.2h4.8l.8 3.2h4.8l-4-16zm-1.6 10.4l1.6-6.4 1.6 6.4h-3.2zM68.8 12h-4.8v16h4.8v-6.4h1.6V12h-1.6v3.2h-1.6V12zM80 12h-4.8v16H80v-3.2h-1.6v-3.2h1.6v-3.2h-1.6V15.2H80V12z" fill="#003882"/>
        <path d="M96.8 12L92 28h4.8l.8-3.2h4.8l.8 3.2h4.8l-4.8-16h-4.8zm.8 10.4l1.6-6.4 1.6 6.4h-3.2z" fill="#003882"/>
    </svg>
);
const HumoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 35" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="100" height="35" rx="3" fill="#E8E8E8"/>
        <path d="M12 10.5h4.5v14H12z" fill="#00A79D"/>
        <path d="M22.5 10.5h14v3h-14zM22.5 16h11v3h-11zM22.5 21.5h14v3h-14z" fill="#00A79D"/>
        <path d="M42.5 10.5 A 7 7 0 0 1 42.5 24.5 A 7 7 0 0 1 42.5 10.5 M 42.5 13.5 A 4 4 0 0 0 42.5 21.5 A 4 4 0 0 0 42.5 13.5" fill="#00A79D"/>
        <path d="M57 10.5 L 57 24.5 L 61.5 24.5 L 61.5 16 L 66 24.5 L 70.5 24.5 L 70.5 10.5 L 66 10.5 L 66 19 L 61.5 10.5 L 57 10.5" fill="#00A79D"/>
        <path d="M85 10.5 a 7 7 0 0 1-7 7v-3a4 4 0 0 0 4-4h3z M78 17.5 a 7 7 0 0 1 7 7h-3a4 4 0 0 0-4-4v-3z" fill="#00A79D"/>
    </svg>
);
const VisaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 24" {...props}>
        <path fill="#1A1F71" d="M10.2 2.2L6.2 15.4l-1.3-7.1c-.2-.9-.9-1.5-1.7-1.7L0 4.9 3 22h4.8l6.5-15.9-1.5-3.1c-.4-.8-1.2-1.3-2.1-1.4l-2.5-.4z"/>
        <path fill="#1A1F71" d="M37.8 22h4.5L46.2 2.2h-4.3c-.9 0-1.7.6-2 1.4L37.8 22z"/>
        <path fill="#1A1F71" d="M58.3 2.2L53.7 22h4.2l1-4.6h5.8l.6 4.6h4.1L64.8 2.2h-6.5zm1.5 11.4l1.8-8.2 1.9 8.2h-3.7z"/>
        <path fill="#F7A600" d="M26.2 2.2l-10.3 20 4.6-.9c.8-.1 1.5-.7 1.7-1.5L26.2 2.2h-4.3c-.9 0-1.7.6-2 1.4l-2.7 13.9L26.2 2.2z"/>
        <path fill="#1A1F71" d="M74 12.1c0-4.6-2.6-6.5-6.5-7.8-.9-.3-1.4-.5-1.4-1 0-.6.7-.9 1.6-.9 1.1 0 2.5.4 2.5.4l.7-4s-1.8-.5-3.3-.5c-3.2 0-5.5 1.7-5.5 4.9 0 3.3 2.1 4.7 5.7 6.2.9.3 1.2.6 1.2 1.1 0 .8-1.1 1.1-2 1.1-1.7 0-2.8-.5-2.8-.5l-.8 4.1s1.5.5 3.5.5c3.6 0 5.8-1.7 5.8-5z"/>
    </svg>
);
const MastercardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" {...props} role="img" aria-labelledby="pi-mastercard">
        <title id="pi-mastercard">Mastercard</title>
        <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#fff" />
        <circle cx="15" cy="12" r="7" fill="#EB001B" />
        <circle cx="23" cy="12" r="7" fill="#F79E1B" />
        <path d="M22 12c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7z" fill="#FF5F00" />
    </svg>
);
const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const TelegramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 2L11 13"></path>
    <path d="M22 2L15 22L11 13L2 9L22 2z"></path>
  </svg>
);
const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  fillColor?: string;
}
const StarIcon: React.FC<StarIconProps> = ({ fillColor = 'none', ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={fillColor} 
    stroke="currentColor" 
    strokeWidth="1.5" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
    />
  </svg>
);

// Components
interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
}
const StarRating: React.FC<StarRatingProps> = ({ rating, interactive = false, onRate, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };
  const handleStarClick = (rateValue: number) => {
    if (interactive && onRate) {
      onRate(rateValue);
    }
  };
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          disabled={!interactive}
          className={`text-yellow-400 ${interactive ? 'cursor-pointer' : ''} ${sizeClasses[size]}`}
          aria-label={`Rate ${star} star`}
        >
          <StarIcon 
            fillColor={star <= rating ? 'currentColor' : 'none'}
            className={interactive ? 'hover:scale-125 transition-transform' : ''}
          />
        </button>
      ))}
    </div>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeCategory, onSelectCategory }) => {
  const categories: (Category | 'all')[] = ['all', Category.Computers, Category.Phones, Category.Accessories];
  const categoryNames = {
      'all': 'Bosh sahifa',
      [Category.Computers]: 'Kompyuterlar',
      [Category.Phones]: 'Smartfonlar',
      [Category.Accessories]: 'Aksessuarlar',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCategorySelect = (category: Category | 'all') => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-heading"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
             <div className="text-xl font-extrabold text-red-600 tracking-wider">
                ARZONI BIZDA
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Menyuni yopish">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            <h2 id="mobile-menu-heading" className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Menyu</h2>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left text-lg font-medium p-4 rounded-lg transition-colors duration-200 ${
                        activeCategory === category ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {categoryNames[category]}
                </button>
            ))}
             <a
                href="#footer"
                onClick={onClose}
                className="w-full text-left text-lg font-medium p-4 rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100 block"
              >
                Aloqa
              </a>
          </nav>
          <div className="p-6 border-t border-gray-200">
             <div className="flex justify-center space-x-6">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors" aria-label="Instagram">
                    <InstagramIcon className="w-7 h-7" />
                </a>
                <a href="https://t.me/matyaqubov_m" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-600 transition-colors" aria-label="Telegram">
                    <TelegramIcon className="w-7 h-7" />
                </a>
             </div>
             <p className="text-center text-xs text-gray-400 mt-6">&copy; {new Date().getFullYear()} Arzoni Bizda</p>
          </div>
        </div>
      </div>
    </>
  );
};

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddReview: (productId: number, review: Omit<Review, 'id'>) => void;
}
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddReview }) => {
  const [newReview, setNewReview] = useState({ author: '', rating: 0, comment: '' });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product.id]);

  const formattedPrice = new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', minimumFractionDigits: 0 }).format(product.price).replace('UZS', ' so‘m');
  
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (product && newReview.author && newReview.comment && newReview.rating > 0) {
      onAddReview(product.id, newReview);
      setNewReview({ author: '', rating: 0, comment: '' });
    } else {
      alert("Iltimos, barcha maydonlarni to'ldiring va reyting bering.");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10 bg-white/50 rounded-full p-1" aria-label="Yopish">
            <CloseIcon className="w-6 h-6" />
          </button>
          <div className="w-full md:w-1/2 h-80 md:h-auto bg-gray-100 flex flex-col p-4 md:p-6 gap-4">
            <div className="flex-grow rounded-lg overflow-hidden shadow-inner">
                <img 
                    src={product.images[selectedImageIndex]} 
                    alt={`${product.name} - image ${selectedImageIndex + 1}`} 
                    className="w-full h-full object-cover transition-opacity duration-300" 
                />
            </div>
            {product.images.length > 1 && (
                <div className="flex-shrink-0 flex items-center justify-center gap-2">
                    {product.images.map((img, index) => (
                        <button 
                            key={index} 
                            onClick={() => setSelectedImageIndex(index)}
                            className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ease-in-out ${selectedImageIndex === index ? 'border-red-500 scale-105 shadow-md' : 'border-transparent hover:border-gray-300'}`}
                            aria-label={`View image ${index + 1}`}
                        >
                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h2>
              <div className="flex items-center space-x-2 my-3">
                <StarRating rating={averageRating} />
                <span className="text-sm text-gray-500">({product.reviews.length} izoh)</span>
              </div>
              <p className="text-3xl font-extrabold text-red-600 mb-6">{formattedPrice}</p>
            </div>
            <div className="flex-grow space-y-6 overflow-y-auto pr-2 -mr-2">
                <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Mijozlar fikri</h3>
                {product.reviews.length > 0 ? (
                    <div className="space-y-4">
                    {product.reviews.map(review => (
                        <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                            <p className="font-semibold text-gray-800">{review.author}</p>
                            <StarRating rating={review.rating} size="sm" />
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">Hali izohlar mavjud emas.</p>
                )}
                </div>
                <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Fikr qoldirish</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-600 mb-1">Ismingiz</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={newReview.author}
                        onChange={handleInputChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Reytingingiz</label>
                    <StarRating rating={newReview.rating} onRate={handleRatingChange} interactive size="lg" />
                    </div>
                    <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-600 mb-1">Izoh</label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        value={newReview.comment}
                        onChange={handleInputChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                    ></textarea>
                    </div>
                    <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                    Yuborish
                    </button>
                </form>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onBackToCart: () => void;
  onSubmitOrder: () => void;
}
const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, cartItems, onBackToCart, onSubmitOrder }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedTotalPrice = new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', minimumFractionDigits: 0 }).format(totalPrice).replace('UZS', ' so‘m');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderComplete(true);
    setTimeout(() => {
        onSubmitOrder();
        setIsOrderComplete(false); 
    }, 3000);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
        {isOrderComplete ? (
            <div className="text-center py-12">
                <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto animate-pulse" />
                <h2 className="text-3xl font-bold text-gray-800 mt-6">Buyurtmangiz qabul qilindi!</h2>
                <p className="text-gray-600 mt-2">Tez orada operatorimiz siz bilan bog'lanadi.</p>
            </div>
        ) : (
            <>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Buyurtmani rasmiylashtirish</h1>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Yopish">
                    <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Ma'lumotlaringiz</h2>
                        <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Ism</label>
                        <input type="text" id="name" required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                        </div>
                        <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Telefon raqam</label>
                        <input type="tel" id="phone" defaultValue="+998" required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                        </div>
                        <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-1">Manzil</label>
                        <textarea id="address" rows={3} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Sizning buyurtmangiz</h2>
                        <div className="space-y-2 text-sm text-gray-600">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between">
                            <span>{item.name} x {item.quantity}</span>
                            <span className="font-medium">{new Intl.NumberFormat('uz-UZ').format(item.price * item.quantity)} so'm</span>
                            </div>
                        ))}
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Jami:</span>
                        <span>{formattedTotalPrice}</span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">To'lov turi</h2>
                        <div className="flex space-x-4">
                            <UzcardIcon className="h-8 w-auto" />
                            <HumoIcon className="h-8 w-auto" />
                            <VisaIcon className="h-8 w-auto" />
                            <MastercardIcon className="h-8 w-auto" />
                        </div>
                         <p className="text-sm text-gray-500">To'lov buyurtmani olganingizdan so'ng, naqd pul yoki terminal orqali amalga oshiriladi.</p>
                    </div>
                    </div>
                    <div className="mt-10 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                    <button type="button" onClick={onBackToCart} className="text-gray-600 font-semibold hover:text-red-600 transition-colors">
                        &#8592; Savatga qaytish
                    </button>
                    <button type="submit" className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300">
                        Buyurtma berish
                    </button>
                    </div>
                </form>
            </>
        )}
        </div>
      </div>
    </div>
  );
};

interface FloatingNavProps {
  cartItemCount: number;
  onCartClick: () => void;
}
const FloatingNav: React.FC<FloatingNavProps> = ({ cartItemCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = () => {
    setIsOpen(false);
  };
  const handleCartClick = () => {
    onCartClick();
    setIsOpen(false);
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-center gap-4">
        <div 
          className={`transition-all duration-300 ease-in-out flex flex-col items-center gap-4 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          aria-hidden={!isOpen} 
        >
          <a
            href="#top"
            onClick={handleMenuClick}
            className="bg-white text-gray-700 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Bosh sahifaga qaytish"
            tabIndex={isOpen ? 0 : -1}
          >
            <HomeIcon className="w-7 h-7" />
          </a>
          <a
            href="https://t.me/matyaqubov_m"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-700 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Biz bilan bog'lanish"
            tabIndex={isOpen ? 0 : -1}
          >
            <PhoneIcon className="w-7 h-7" />
          </a>
          <button
            onClick={handleCartClick}
            className="bg-white text-gray-700 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors relative"
            aria-label="Savatni ko'rish"
            tabIndex={isOpen ? 0 : -1}
          >
            <CartIcon className="w-7 h-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-red-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center hover:bg-red-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-expanded={isOpen}
          aria-label="Navigatsiya menyusi"
        >
          <div className="relative w-8 h-8">
            <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 rotate-45 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
              <PlusIcon className="w-8 h-8" />
            </div>
            <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-50'}`}>
              <CloseIcon className="w-8 h-8" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onCheckout: () => void;
}
const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, onCheckout }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const formattedTotalPrice = new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', minimumFractionDigits: 0 }).format(totalPrice).replace('UZS', ' so‘m');
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 id="cart-heading" className="text-2xl font-bold text-gray-800">Savat</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Yopish">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          {cartItems.length > 0 ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.images[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{new Intl.NumberFormat('uz-UZ').format(item.price)} so'm</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                    </div>
                  </div>
                  <button onClick={() => onRemoveFromCart(item.id)} className="text-gray-400 hover:text-red-500" aria-label="O'chirish">
                    <CloseIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-gray-500 p-6">
              <p>Savat boʻsh.</p>
            </div>
          )}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span>Jami:</span>
                <span>{formattedTotalPrice}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Rasmiylashtirish
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Footer: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formState);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <footer id="footer" className="bg-white border-t border-gray-200 mt-16">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">Biz haqimizda</h3>
                        <div className="text-2xl font-extrabold text-red-600 tracking-wider mb-4">
                            ARZONI BIZDA
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            “Arzoni Bizda” — texnik mahsulotlarni arzon va ishonchli narxda taqdim etuvchi onlayn do‘kon. Biz mijozlarga sifatli servis va tez yetkazib berishni kafolatlaymiz.
                        </p>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">Aloqa</h3>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center space-x-3">
                                <TelegramIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <a href="https://t.me/Mashxurbek_Matyoqubov" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">@Mashxurbek_Matyoqubov</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <PhoneIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <span>+998 XX XXX XX XX</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MailIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                                <span>arzoni.bizda@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">Fikr qoldirish</h3>
                        {isSubmitted ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative" role="alert">
                                <strong className="font-bold">Rahmat!</strong>
                                <span className="block sm:inline"> Xabaringiz yuborildi.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="sr-only">Ism</label>
                                    <input type="text" name="name" id="name" placeholder="Ismingiz" value={formState.name} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input type="email" name="email" id="email" placeholder="Email manzilingiz" value={formState.email} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="sr-only">Xabar</label>
                                    <textarea name="message" id="message" rows={4} placeholder="Xabaringiz" value={formState.message} onChange={handleInputChange} required className="w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors">
                                    Yuborish
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="text-center text-gray-400 mt-16 pt-8 border-t border-gray-100 text-sm">
                    &copy; {new Date().getFullYear()} Arzoni Bizda. Barcha huquqlar himoyalangan.
                </div>
            </div>
        </footer>
    );
};


interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const formattedPrice = new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: 'UZS', minimumFractionDigits: 0 }).format(product.price).replace('UZS', 'so‘m');
    const averageRating = product.reviews.length > 0
        ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
        : 0;

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        onAddToCart(product);
        if (showConfirmation) return; 
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
        }, 2000); 
    };

  return (
    <div 
        className="relative bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl cursor-pointer"
        onClick={() => onProductClick(product)}
    >
      <div className="w-full h-48 md:h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4 flex flex-col h-56 justify-between">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
          <div className="flex items-center space-x-2 mb-2">
            <StarRating rating={averageRating} />
            <span className="text-xs text-gray-500">({product.reviews.length} izoh)</span>
          </div>
          <p className="text-lg md:text-xl font-bold text-red-600">{formattedPrice}</p>
        </div>
        <button 
            onClick={handleAddToCartClick}
            className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform hover:scale-105 z-10"
        >
          Savatga qo'shish
        </button>
      </div>
      <div
        aria-live="polite"
        className={`absolute bottom-28 left-1/2 -translate-x-1/2 w-max bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out z-20
          ${showConfirmation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        ✓ Savatga qo'shildi!
      </div>
    </div>
  );
};

interface ProductListProps {
  category?: Category;
  products?: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  limit?: number;
  title?: string;
}
const ProductList: React.FC<ProductListProps> = ({ category, products, onAddToCart, onProductClick, limit, title }) => {
  let productsToShow: Product[] = [];
  if (products) {
    productsToShow = limit ? products.slice(0, limit) : products;
  } else if (category) {
    const filteredProducts = PRODUCTS.filter((product) => product.category === category);
    productsToShow = limit ? filteredProducts.slice(0, limit) : filteredProducts;
  }
  const effectiveTitle = title || (category ? category.replace('-', ' ') : 'Mahsulotlar');
  if (productsToShow.length === 0 && (products || category)) {
    return (
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 capitalize">
          {effectiveTitle}
        </h2>
        <p className="text-gray-500 text-center py-10">Hech narsa topilmadi.</p>
      </section>
    );
  }
  return (
    <section>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 capitalize">
            {effectiveTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {productsToShow.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onProductClick={onProductClick} 
            />
        ))}
        </div>
    </section>
  );
};

const BannerSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === BANNER_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative w-full h-56 md:h-96 overflow-hidden rounded-2xl shadow-lg">
      <div className="w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {BANNER_SLIDES.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <img src={slide.image} alt={`Banner ${slide.id}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white text-center px-4" style={{textShadow: '0 2px 8px rgba(0,0,0,0.7)'}}>
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/20 backdrop-blur-sm p-1.5 rounded-full">
        {BANNER_SLIDES.map((_, index) => (
            <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-5' : 'bg-white/60 hover:bg-white'}`}
            />
        ))}
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-red-600 flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-6xl md:text-9xl font-extrabold text-white animate-glow tracking-widest uppercase">
          Arzoni
        </h1>
        <h1 className="text-6xl md:text-9xl font-extrabold text-white animate-glow tracking-widest uppercase">
          Bizda
        </h1>
      </div>
    </div>
  );
};

interface HeaderProps {
    cartItemCount: number;
    onCartClick: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeCategory: Category | 'all';
    onSelectCategory: (category: Category | 'all') => void;
}
const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick, searchQuery, onSearchChange, activeCategory, onSelectCategory }) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className={`text-2xl md:text-3xl font-extrabold text-red-600 tracking-wider transition-opacity duration-300 ${isMobileSearchOpen ? 'hidden' : 'block'} md:block`}>
            ARZONI BIZDA
          </div>
          <div className="hidden md:flex flex-grow max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Mahsulotlarni qidirish..."
                className="w-full py-2.5 pl-5 pr-12 text-gray-700 bg-slate-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={onCartClick} className="text-gray-600 hover:text-red-600 transition-colors relative">
              <CartIcon className="h-7 w-7" />
              {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                  </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex flex-grow items-center justify-end">
            {!isMobileSearchOpen ? (
              <div className="flex items-center space-x-4">
                  <button 
                      onClick={() => setIsMobileSearchOpen(true)}
                      className="text-gray-600 hover:text-red-600"
                      aria-label="Qidirish"
                    >
                      <SearchIcon className="h-6 w-6" />
                  </button>
                  <button onClick={onCartClick} className="text-gray-600 hover:text-red-600 relative">
                      <CartIcon className="h-6 w-6" />
                      {cartItemCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                              {cartItemCount}
                          </span>
                      )}
                  </button>
                  <button 
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-gray-600 hover:text-red-600"
                    aria-label="Menyuni ochish"
                  >
                      <MenuIcon className="h-6 w-6" />
                  </button>
              </div>
            ) : (
              <div className="w-full flex items-center">
                  <div className="relative w-full">
                      <input
                        type="search"
                        placeholder="Qidirish..."
                        className="w-full py-2.5 pl-5 pr-4 text-gray-700 bg-slate-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        autoFocus
                      />
                  </div>
                  <button 
                      onClick={() => setIsMobileSearchOpen(false)}
                      className="ml-3 text-gray-500 hover:text-gray-800 flex-shrink-0"
                      aria-label="Qidiruvni yopish"
                  >
                    <CloseIcon className="w-6 h-6" />
                  </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />
    </>
  );
};

interface CategoryTabsProps {
  activeCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
}
const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onSelectCategory }) => {
  const categories: {key: Category | 'all', name: string}[] = [
    { key: 'all', name: 'Bosh sahifa' },
    { key: Category.Phones, name: 'Smartfonlar' },
    { key: Category.Computers, name: 'Kompyuterlar' },
    { key: Category.Accessories, name: 'Aksessuarlar' },
  ];

  return (
    <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => onSelectCategory(category.key)}
          className={`px-5 py-2.5 text-sm md:text-base font-semibold rounded-full whitespace-nowrap transition-all duration-300
            ${activeCategory === category.key 
              ? 'bg-red-600 text-white shadow-md transform scale-105' 
              : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100 hover:ring-gray-300'
            }`}
        >
          {category.name}
        </button>
      ))}
       <a
        href="#footer"
        className="px-5 py-2.5 text-sm md:text-base font-semibold rounded-full whitespace-nowrap transition-all duration-300 bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100 hover:ring-gray-300"
      >
        Aloqa
      </a>
    </div>
  );
};


// App Component
const App: React.FC = () => {
  const [showHero, setShowHero] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(false);
      setTimeout(() => setContentVisible(true), 50); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  
  const handleAddReview = (productId: number, review: Omit<Review, 'id'>) => {
    setProducts(currentProducts => 
      currentProducts.map(p => {
        if (p.id === productId) {
          const newReview: Review = { ...review, id: Date.now() };
          const updatedReviews = [...p.reviews, newReview];
          const updatedProduct = { ...p, reviews: updatedReviews };
          if(selectedProduct && selectedProduct.id === productId) {
            setSelectedProduct(updatedProduct);
          }
          return updatedProduct;
        }
        return p;
      })
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  }

  const handleSubmitOrder = () => {
    console.log("Order submitted!");
    setCartItems([]);
    setIsCheckoutOpen(false);
  }

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (showHero) {
    return <Hero />;
  }
  
  const categoryNames = {
    [Category.Computers]: 'Kompyuterlar',
    [Category.Phones]: 'Smartfonlar',
    [Category.Accessories]: 'Aksessuarlar',
    [Category.Discounts]: 'Chegirmalar',
  };

  return (
    <div id="top" className={`bg-slate-50 min-h-screen transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {searchQuery ? (
          <ProductList 
            title={`Qidiruv natijalari: "${searchQuery}"`}
            products={filteredProducts} 
            onAddToCart={handleAddToCart}
            onProductClick={setSelectedProduct}
          />
        ) : (
          <>
            <BannerSlider />
            {activeCategory === 'all' && (
               <ProductList
                  category={Category.Discounts}
                  onAddToCart={handleAddToCart}
                  onProductClick={setSelectedProduct}
                  limit={4}
                  title="🔥 Chegirmalar"
                />
            )}
            <CategoryTabs activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            <ProductList 
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              onProductClick={setSelectedProduct}
              title={activeCategory === 'all' ? 'Barcha mahsulotlar' : categoryNames[activeCategory as Category]}
            />
          </>
        )}
      </main>
      
      <Footer />

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onBackToCart={handleBackToCart}
        onSubmitOrder={handleSubmitOrder}
      />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddReview={handleAddReview}
        />
      )}

      <FloatingNav cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
    </div>
  );
};

// Render logic
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);