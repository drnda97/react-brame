import React, {FC, useState} from "react";
import {
	Box,
	Button,
	Modal,
	TextareaAutosize,
	TextField,
	Typography
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

type Props = {
	setShowModal: (showModal: boolean) => void;
	showModal: boolean
}

const CreateCategory:FC<Props> = ({setShowModal, showModal}) => {
	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");

	const handleSaveArticle = async () => {
		if(title.trim() && body.trim()) {
			const params = JSON.stringify({name: title, description: body});
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api-token': '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN',
				},
				body: params
			}
			await fetch(`http://18.192.182.140/api/categories`,  options);
		}
		alert("Populate fields correctly!");
	}

	const handleTitleChange = (event: any):void => {
		setTitle(event.target.value);
	}

	const handleBodyChange = (event: any):void => {
		setBody(event.target.value);
	}

	const handleCloseModal = ():void => {
		setShowModal(false);
	}

	return (
		<Modal
			open={showModal}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Create Category
				</Typography>
				<TextField id="outlined-basic" label="Name" variant="outlined" value={title} onChange={handleTitleChange} className={"w-100 mb-3"}/>
				<TextareaAutosize
					className={"mb-3 text-area"}
					aria-label="empty textarea"
					placeholder="Description"
					value={body}
					onChange={handleBodyChange}
				/>
				<div className={"mt-3"}>
					<Button variant="outlined" endIcon={<SaveAltIcon />} onClick={handleSaveArticle}>Save </Button>
				</div>
			</Box>
		</Modal>
	)
}

export default CreateCategory;