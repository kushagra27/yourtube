pragma solidity ^0.4.24;

contract Voter{
    struct OptionPos{
        uint pos;
        bool exists;
    }
    
    uint[] public votes;
    string[] public options;
    mapping(address => bool) hasVoted;
    mapping(string => OptionPos) posOfOption;
    
    function Voter (string[] _options) public {
        options = _options;
        votes.length = options.length;
    
        for (uint i =0 ; i<options.length;i++){
            OptionPos memory optionPos = OptionPos(i,true);
            string optionName = options[i];
            posOfOption[optionName] = optionPos;
        }
    }
    
    function vote(uint option) public {
        require(0 <= option && option < options.length, "Invalid Option");
        require(!hasVoted[msg.sender],"Account has already voted");
        votes[option] = votes[option]+1;
        hasVoted[msg.sender] = true;
    }
    
    function vote(string optionName) public {
        require(!hasVoted[msg.sender],"Account has already voted");
        OptionPos memory optionPos = posOfOption[optionName];
        require(optionPos.exists,"Option does not exist");
        votes[optionPos.pos] = votes[optionPos.pos]+1;
        hasVoted[msg.sender] = true;
    }
    
    function getOptions() public view returns(string[]) {
        return options;
    }
    
    function getVotes() public view returns(uint[]){
        return votes;
    }
}