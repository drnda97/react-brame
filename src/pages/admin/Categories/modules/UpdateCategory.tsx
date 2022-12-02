import React, {FC, useEffect, useState} from "react";
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
	setShowModalUpdate: (showModal: boolean) => void;
	showModalUpdate: boolean;
	id?: number | null;
}

const UpdateCategory:FC<Props> = ({setShowModalUpdate, showModalUpdate, id}) => {
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
			await fetch(`http://18.192.182.140/api/categories/${id}`,  options);
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
		setShowModalUpdate(false);
	}

	useEffect(() => {
		getCategoryByID().then((res) => {
			setTitle(res.data.name);
			setBody(res.data.description);
		})
	}, [])

	const getCategoryByID = async () => {
		return await fetch(`http://18.192.182.140/api/categories/${id}`).then((res) => res.json());
	}

	return (
		<Modal
			open={showModalUpdate}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Update Category
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

export default UpdateCategory;