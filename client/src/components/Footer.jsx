import React from "react";
import Logo from "./Logo";
import { RiMailLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react";

export default function Footer() {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-(--secondary-color) text-base-content p-10">
        <nav>
          <Logo />
          <p className="max-w-sm">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>
          <p className="flex items-center gap-1 text-sm mt-1">
            <RiMapPinLine size={15} />
            95 Tinubu Estate, Lekki, Lagos
          </p>
          <p className="flex items-center gap-1 text-sm mt-1">
            <RiPhoneLine size={15} />
            +234 675 8935 675
          </p>
          <p className="flex items-center gap-1 text-sm mt-1">
            <RiMailLine size={15} />
            support@rentbetahouse.com
          </p>
        </nav>
        <nav>
          <h6 className="text-2xl text-white font-semibold">Quick Links</h6>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Properties</a>
          <a className="link link-hover">About</a>
          <a className="link link-hover">Contact us</a>
          <a className="link link-hover">Blog</a>
        </nav>
        <nav>
          <h6 className="text-2xl text-white font-semibold">More</h6>
          <a className="link link-hover">Agents</a>
          <a className="link link-hover">Affordable Homes</a>
          <a className="link link-hover">FaAQ's</a>
        </nav>
        <nav>
          <h6 className="text-2xl text-white font-semibold">Popular Search</h6>
          <a className="link link-hover">Apartment for sale</a>
          <a className="link link-hover">Apartment for rent</a>
          <a className="link link-hover">3 bedroom flat</a>
          <a className="link link-hover">Bungalow</a>
        </nav>
      </footer>
      <footer className="footer bg-(--secondary-color) text-base-content border-gray-300 border-t px-10 py-4">
        <aside className="flex w-full justify-between py-10">
          <p>Copyright 2023 Betahouse | Designed by Michael.fig</p>
          <br />
          <p>Privacy Policy</p>
        </aside>
      </footer>
    </div>
  );
}
