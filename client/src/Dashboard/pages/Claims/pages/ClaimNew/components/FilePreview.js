import React from "react";
import { withStyles, Card } from "@material-ui/core";
import styles from "./upload.style";
class FilePreview extends React.Component {
	render() {
		const { classes, file } = this.props;
		const preview = URL.createObjectURL(file);
		return (
			<Card className={classes.card}>
				<img className={classes.image} src={preview} alt="preview" />
				<h4>{file.name.substr(0, 10)}</h4>
			</Card>
		);
	}
}
export default withStyles(styles, { withTheme: true })(FilePreview);
