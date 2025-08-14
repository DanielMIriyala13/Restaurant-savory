const socket = new WebSocket('ws://localhost:3000/ws'); 
socket.onopen = () => { console.log('WebSocket connected!'); 

}; 
socket.onerror = (error) => { console.error('WebSocket error:', error);
    
 }; 


export default socket;