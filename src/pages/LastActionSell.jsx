import React from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import { Timeline } from "antd"; // Ensure Timeline is imported
import "../styles/last-action-sell.css"; // Ensure your CSS file is imported

const LastActionSell = () => (
  <div className="container">
    <div className="timeline-section">
      <Timeline>
        <Timeline.Item color="green">
          <h2>Sell Your Watch Enquiry
            <span className="status complete">Completed</span>
          </h2>
        </Timeline.Item>
        <Timeline.Item color="blue">
          <h2>Our Initial Offer
            <span className="status in-progress">In Progress</span>
          </h2>
          <ul>
            <li>Total expected payout: $8,890.00</li>
            <li>Initial offer (subject to inspection): $8,950.00</li>
            <li>Minimum servicing fee: -$60.00</li>
          </ul>
          <h3>Title: Total expected payout</h3>
          <p>
            This estimate is valid until 29/05/2024. For us to make your final offer, you'll need to send us your watch to be checked by one of our experts. Once this is done, we'll contact you with a quote. You can get your watch to us for inspection in this way:
          </p>
          <Link to="/select-store">
            <button>Drop off in Boutique</button>
          </Link>
          <p>Provide additional details about your watch to speed up the process.</p>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <h2>Send Your Watch for Authentication and Inspection
            <span className="status pending">Pending</span>
          </h2>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <h2>Final Offer
            <span className="status pending">Pending</span>
          </h2>
        </Timeline.Item>
        <Timeline.Item color="gray">
          <h2>Sale Complete
            <span className="status pending">Pending</span>
          </h2>
        </Timeline.Item>
      </Timeline>
    </div>
    <div className="details-section">
      <h2>Your Watch</h2>
      <ul>
        <li>Brand: Rolex</li>
        <li>Series: Submariner</li>
        <li>Box: No</li>
        <li>Papers: No</li>
        <li>Case: 40 MM</li>
        <li>Case material: Steel</li>
        <li>Movement: Automatic</li>
        <li>Bracelet: Steel (Oyster)</li>
        <li>Size: length 40 cm</li>
        <li>Dial: Black</li>
      </ul>
      <p>Our initial offer is good until [Date].</p>
      <p>Contact details: [Name] - [Phone ending with 7492].</p>
    </div>
  </div>
);

export default LastActionSell;
