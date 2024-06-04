import React from "react";
import { Link } from "react-router-dom";
import "../styles/last-action-sell.css";


function LastActionSell() {
  return (
    <div className="container">
      <div className="left-section">
        <h2>Sell Your Watch Enquiry</h2>
        <p className="status complete">Status: Completed</p>
        <h2>Our Initial Offer</h2>
        <p className="status in-progress">Status: In Progress</p>
        <ul>
          <li>Total expected payout: [Price]</li>
          <li>Outinitial offer (subject to inspection): [Offer]</li>
          <li>Minimum servicing fee: [Fee]</li>
        </ul>
        <h3>Title: Total expected payout</h3>
        <p>
          This estimate is valid until [Date]. For us to make your final offer, you'll need to send us your watch to be checked by one of our experts. Once this is done, we'll contact you with a quote. You can get your watch to us for inspection in this way: 
        </p>
        <Link to="/select-store"><button>Drop off in Boutique</button></Link>
        <p>Provide additional details about your watch to speed up the process.</p>
        <h2>Send Your Watch for Authentication and Inspection</h2>
        <p className="status pending">Status: Pending</p>
        <h2>Final Offer</h2>
        <p>Status: Pending</p>
        <h2>Sale Complete</h2>
        <p>Status: Pending</p>
      </div>
      <div className="right-section">
        <h2>Watch Details</h2>
        <ul>
          <li>Brand: Rolex</li>
          <li>Model: Submariner</li>
          <li>Case Size: 40mm</li>
          <li>Strap Material: Stainless Steel</li>
          <li>Strap Type: Oyster</li>
          <li>Bezel Material: Ceramic</li>
          <li>Dial Color: Black</li>
        </ul>
        <p>Our initial offer is good until [Date].</p>
        <p>Contact details: [Name] - [Phone ending with 7492].</p>
      </div>
    </div>
  );
}

export default LastActionSell;
