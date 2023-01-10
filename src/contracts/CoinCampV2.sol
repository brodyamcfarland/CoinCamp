pragma solidity ^0.8.0;

// This smart contract allows users to create crowdfunding campaigns and collect
// funds when the campaign's time period expires.

// Our contract will store a mapping of campaign details, including the campaign's
// creator, duration, goal, and current amount raised.

contract Crowdfunding {
    // Mapping of campaign details
    mapping (uint => Campaign) public campaigns;

    // Struct to represent a crowdfunding campaign
    struct Campaign {
        address creator;    // Creator of the campaign
        uint duration;      // Duration of the campaign, in seconds
        uint goal;          // Funding goal, in wei
        uint amountRaised;  // Amount of funds raised, in wei
        bool ended;         // Whether the campaign has ended
        uint creationTime;  // Timestamp of when the campaign was created
    }

    // Event for when a campaign is created
    event NewCampaign(uint campaignID);

    // Event for when a campaign reaches its funding goal
    event CampaignSuccess(uint campaignID);

    // Event for when a campaign's time period expires without reaching its goal
    event CampaignFailure(uint campaignID);

    // Function to create a new campaign
    function createCampaign(uint duration, uint goal) public {
        // Create a new campaign and assign a unique ID to it
        uint campaignID = campaigns.length++;

        // Initialize the campaign with the provided details and the current time
        campaigns[campaignID] = Campaign(msg.sender, duration, goal, 0, false, now);

        // Emit an event to signal the creation of the new campaign
        emit NewCampaign(campaignID);
    }

    // Function to contribute to an existing campaign
    function contribute(uint campaignID) public payable {
        // Retrieve the campaign details
        Campaign storage campaign = campaigns[campaignID];

        // Check that the campaign exists and is still active
        require(!campaign.ended, "This campaign has already ended.");

        // Check that the campaign has not yet reached its goal
        require(campaign.amountRaised + msg.value < campaign.goal, "This campaign has already reached its goal.");

        // Add the contribution to the amount raised for the campaign
        campaign.amountRaised += msg.value;

        // If the campaign has reached its goal, mark it as ended and emit a success event
        if (campaign.amountRaised >= campaign.goal) {
            campaign.ended = true;
            emit CampaignSuccess(campaignID);
        }
    }

    // Function to retrieve the funds raised by a campaign
    function retrieveFunds(uint campaignID) public {
        // Retrieve the campaign details
        Campaign storage campaign = campaigns[campaignID];

        // Check that the campaign exists and is ended
        require(campaign.ended, "This campaign is still active.");

        // Check that the caller is the creator of the campaign
        require(msg.sender == campaign.creator, "Only the creator of the campaign can retrieve the funds.");

        // Transfer the funds to the creator
        msg.sender.transfer(campaign.amountRaised);
    }

    // Function to end a campaign if its time period has expired
    function checkCampaigns() public {
        // Iterate through all campaigns
    for (uint i = 0; i < campaigns.length; i++) {
        // Retrieve the campaign details
        Campaign storage campaign = campaigns[i];

        // Check if the campaign's time period has expired
        if (!campaign.ended && now >= campaign.duration + campaign.creationTime) {
            // Mark the campaign as ended
            campaign.ended = true;

            // If the campaign has reached its goal, emit a success event
            if (campaign.amountRaised >= campaign.goal) {
                emit CampaignSuccess(i);
            }
            // Otherwise, emit a failure event
            else {
                emit CampaignFailure(i);
            }
        }
    }
}