local connectionURL = "ws://localhost:8999/"
local ws, err = http.websocket(connectionURL)
if not ws then
  return printError(err)
end
ws.send("Computer " .. os.getComputerID());
ws.send("fuel" .. turtle.getFuelLevel());

while true do
  local _, url, response, isBinary = os.pullEvent("websocket_message")
  if url == connectionURL then
    print(response)
    if response == "close" then
    ws.close()
    break
    end
    if response == "getfuel" then
      ws.send("fuel" .. turtle.getFuelLevel());
    end
    if response == "refuel" then
      turtle.refuel() 
      ws.send("fuel" .. turtle.getFuelLevel());

    end
    if response == "moveup" then
      turtle.up() 
    end
    if response == "movedown" then
      turtle.down() 
    end
    if response == "moveback" then
      turtle.back() 
    end
    if response == "moveforward" then
      turtle.forward() 
    end
    if response == "moveleft" then
      turtle.turnLeft() 
    end
    if response == "moveright" then
      turtle.turnRight() 
    end
    if response == "" then

    end

    
  end  
end