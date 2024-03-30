/*self.onmessage = function(event) {
    const dataFromMain = event.db;
    alert('Data received from main thread:', dataFromMain);

    // Manipulate data (e.g., perform some computation)
    const assignDb = () => {
        fetch(`https://test-vyral.onrender.com/mobile/getDb`, { method: 'get' }).then((response)=>{
            return response.json();
        }).then((data)=>{
            //app.db_f = 'y';
            setTimeout(() => {
                const processedData = data;
                alert('Dassigned: '+data.users.length);
            
                // Send the processed data back to the main thread
                self.postMessage(processedData);
                reAssign();
            }, 1000);
        });
    }
    const reAssign = () => {
        setTimeout(() => {
            assignDb();
        }, 1000);
    
    assignDb();
}*/

self.addEventListener('message', async function (event) {
    // Assuming the event.data contains the server route URL
    // alert('started');
    const serverRoute = event.data;
  
    try {
      const response = await fetch(`https://test-vyral.onrender.com/mobile/getDb`);
      const data = await response.json();
  
      // Now 'data' contains the fetched JSON/object
      // You can post the result back to the main thread or perform further actions
      self.postMessage(data);
    } catch (error) {
      // Handle errors
      alert.error('Error fetching data:', error);
    }
  });