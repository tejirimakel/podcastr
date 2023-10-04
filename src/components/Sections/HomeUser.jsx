import React, { useState } from "react";
import {
	CardGroup,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	CardSubtitle,
	Badge,
} from "reactstrap";
import TopNavbar from "../Nav/TopNavbar3";
import cards from "../../data/cards.json";

function HomeUser() {
	const [name, setName] = useState("User");

	return (
		<>
			<TopNavbar />
			<div className="App" style={{ backgroundColor: "#12130f" }}>
				<div
					className="container"
					style={{ width: "100%", marginTop: "5rem" }}
				>
					<div>
						<h1 className="textCenter mb-4">Welcome, {name}</h1>
						<div className="flexSpaceCenter">
							<h2>Arts podcast recommendations for you</h2>
							<p className="viewall"
							onClick={(event) =>
                      (window.location.href = "/home")
                    }>view all</p>
						</div>
						<div
							className=""
							style={{
								width: "100%",
								marginTop: "1rem",
								marginBottom: "5rem",
							}}
						>
							<CardGroup style={{ display: "flex" }}>
								{cards.map((el) => {
									return (
										<Card className="noHover" key={el.id}>
											<CardImg
												className="pb-2 radius6"
												height="250px"
												width="100%"
												src={el.img}
											/>
											<CardBody className="textCenter">
												<CardTitle tag="h4">
													{el.title}{" "}
													<Badge>{el.badge}</Badge>
												</CardTitle>
												<CardSubtitle
													className="mb-1 text-muted"
													tag="h6"
												>
													{el.location}
												</CardSubtitle>
												<CardText
													tag="h6"
													className="text-muted"
												>
													{el.cat}
												</CardText>
											</CardBody>
										</Card>
									);
								})}
							</CardGroup>
						</div>
						<div className="flexSpaceCenter">
							<h2>Design podcast recommendations for you</h2>
							<p className="viewall"
							onClick={(event) =>
                      (window.location.href = "/home")
                    }>view all</p>
						</div>
						<div
							className=""
							style={{
								width: "100%",
								marginTop: "1rem",
								marginBottom: "5rem",
							}}
						>
							<CardGroup style={{ display: "flex" }}>
								{cards.map((el) => {
									return (
										<Card className="noHover" key={el.id}>
											<CardImg
												className="pb-2 radius6"
												height="250px"
												width="100%"
												src={el.img}
											/>
											<CardBody className="textCenter">
												<CardTitle tag="h4">
													{el.title}{" "}
													<Badge>{el.badge}</Badge>
												</CardTitle>
												<CardSubtitle
													className="mb-1 text-muted"
													tag="h6"
												>
													{el.location}
												</CardSubtitle>
												<CardText
													tag="h6"
													className="text-muted"
												>
													{el.cat}
												</CardText>
											</CardBody>
										</Card>
									);
								})}
							</CardGroup>
						</div>

						<div
							style={{ background: "#303030" }}
							className="radius6 flexSpaceCenter p-5 mb-5"
						>
							<h3>Find your next guest appearance</h3>
							<button className="formFieldButton">
								Explore all shows
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default HomeUser;