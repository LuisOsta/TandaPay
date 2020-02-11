import React from "react";
import { Grid, Button, withStyles } from "@material-ui/core";

import styles from "./upload.style";
import FilePreview from "./FilePreview";

const renderFilesSelected = (files) => {
	const size = files.length;
	let output = [];
	for (var x = 0; x < size; x++) {
		output.push(<FilePreview key={x} file={files[x]} />);
	}
	return output;
};
const FileUpload = (props) => {
	const { onUpload, classes, files } = props;
	return (
		<Grid item xs={12} sm={6}>
			<div className={classes.container}>
				<input
					accept="image/*, .pdf"
					className={classes.input}
					id="documentation"
					multiple
					name="documentation"
					type="file"
					onChange={onUpload}
				/>
				<label htmlFor="documentation">
					<Button
						raised={1}
						component="span"
						variant="outlined"
						className={classes.button}
					>
						Upload Documents
					</Button>
				</label>
				<div className={classes.files}>{renderFilesSelected(files)}</div>
			</div>
		</Grid>
	);
};

export default withStyles(styles, { withTheme: true })(FileUpload);
