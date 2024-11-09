"use client"

import React from 'react';
import { Button} from './ui/button';
import { useState } from 'react';
import CreateCollectionSheet from './CreateCollectionSheet';


const CreateCollectionButton = () => {
    // State to handle sheet visibility
    const [open, setOpen] = useState(false);

            // Function to open the sheet
    const handleOpenChange = (open: boolean) => setOpen(open);

    // Function to close the sheet
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
        <Button onClick={() => setOpen(true)} className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Collection
        </Button>
        <CreateCollectionSheet open={open} onOpenChange={handleOpenChange} />
        </>

    );
};

export default CreateCollectionButton;
