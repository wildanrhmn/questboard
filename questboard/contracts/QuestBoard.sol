// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IQuestBadge {
    function safeMint(address to, string memory uri) external returns (uint256);
}

contract QuestBoard {
    address public owner;
    IERC20 public questToken;
    IQuestBadge public questBadge;
    uint256 public constant BADGE_MILESTONE = 5;
    string public badgeURI;

    struct Quest { string title; uint256 reward; bool active; }
    Quest[] public quests;

    mapping(address => uint256) public points;
    mapping(address => uint256) public completedCount;
    mapping(address => bool) public badgeAwarded;
    mapping(address => mapping(uint256 => bool)) public completed;

    event QuestAdded(uint256 indexed questId, string title);
    event QuestCompleted(address indexed player, uint256 indexed questId, uint256 reward);
    event BadgeAwarded(address indexed player, uint256 tokenId);

    constructor(address token, address badge, string memory _badgeURI) {
        owner = msg.sender;
        questToken = IERC20(token);
        questBadge = IQuestBadge(badge);
        badgeURI = _badgeURI;
    }

    function addQuest(string memory title, uint256 reward) public {
        require(msg.sender == owner, "only owner can add quests");
        quests.push(Quest(title, reward, true));
        emit QuestAdded(quests.length - 1, title);
    }

    function completeQuest(uint256 questId) public {
        require(questId < quests.length, "quest does not exist");
        require(quests[questId].active, "quest is not active");
        require(!completed[msg.sender][questId], "already completed");

        completed[msg.sender][questId] = true;
        points[msg.sender] += quests[questId].reward;
        completedCount[msg.sender] += 1;

        questToken.transfer(msg.sender, quests[questId].reward * 1e18);
        emit QuestCompleted(msg.sender, questId, quests[questId].reward);

        if (completedCount[msg.sender] == BADGE_MILESTONE && !badgeAwarded[msg.sender]) {
            badgeAwarded[msg.sender] = true;
            uint256 tokenId = questBadge.safeMint(msg.sender, badgeURI);
            emit BadgeAwarded(msg.sender, tokenId);
        }
    }

    function deactivateQuest(uint256 questId) public {
        require(msg.sender == owner, "only owner");
        require(questId < quests.length, "quest doesn't exist");
        quests[questId].active = false;
    }

    function questCount() public view returns (uint256) {
        return quests.length;
    }
}