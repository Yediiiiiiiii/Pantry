'use client';

import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, getDocs, QuerySnapshot, query,onSnapshot,doc, setDoc,count,deleteDoc, getDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase"; // Import firestore from your configuration file
import { db } from "../firebase";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [Pantry, setPantry] = useState([])
  
  const[open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('')

  
    const updatePantry = async () => {
      const q = query(collection(db, 'Pantry'));
      const pantryList = []
      const docs = await getDocs(q)
      docs.forEach((doc) => {
        const data = doc.data()
        pantryList.push({id:doc.id, count: data.count || 0})
        })
        // console.log(pantryList)
        setPantry(pantryList)
      }

      useEffect(() => {
        updatePantry();
    }, [])
    const addItem = async (item) => {
      const docRef = doc(collection(db,'Pantry'),item)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const{count} = docSnap.data()
        await setDoc(docRef,{count:count+1})
      } else {
        await setDoc(docRef,{count: 1})
      }
      await updatePantry()
      // console.log("Item added: ", itemName)
    }


    const removeItem = async (item) => {
      const docRef = doc(collection(db,'Pantry'),item) 
      const docSnap = await getDoc(docRef)
      if(!item){
        console.error("Item name cannot be empty")
        return
      }
      if (docSnap.exists()) {
        const{count} = docSnap.data()
        if (count == 1) {
          await deleteDoc(docRef)
        } else {
          await setDoc(docRef,{count:count-1})
        }
        await updatePantry()
      }

    };

    return (
      <Box
        width="100vw"
        height="100vh"
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
        border={'1px solid #333'}
        gap={2}
      >
        <Modal 
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        > 
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item 
            </Typography>
            <Stack width ="100%" direction={'row'} spacing={2}>
              <TextField 
              id="outlined-basic" 
              label="Item" 
              variant="outlined" 
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              />
              <Button 
              variant="outlined" 
              onClick={() => {
                addItem(itemName); 
                setItemName('')
                handleClose()
                
              }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleOpen}>Add</Button>
        <Box border={'1px solid #333'}>
          <Box 
            width="800px" 
            height="100px" 
            bgcolor={'#ADD8E6'} 
            display={'flex'} 
            justifyContent={'center'} 
          >
            <Typography variant="h1" color={'#333'} textAlign={'center'}>
              Pantry Items
            </Typography>
        </Box>
        <Stack width="800px" height="500px" spacing={2} overflow={"auto"}>
          {Pantry.map((item) => (
            <Box
              key={item.id}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={"#f0f0f0"}
              padding={2}
            >
              <Typography variant="h3" color={'#333'} textAlign={'center'}> 
                {item.id.charAt(0).toUpperCase()+ item.id.slice(1)} ({item.count})
              </Typography>
              <Button variant="outlined" onClick={() => removeItem(item.id)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
       </Box>
      </Box>
    );
}

