export const trending = (req, res) => res.send("Homepage Videos!");

export const see =(req, res) => {
    console.log(req.params);
    return res.send(`Watch Videos ID:${req.params.id}`);
};
export const edit =(req, res) => {
    console.log(req.params);
    return res.send("Edit");
};
export const search =(req, res) => res.send("Search");
export const upload =(req, res) => res.send("Upload Video");
export const deleteVideo =(req, res) => {
    console.log(req.params);
    return res.send("Delete Video");
}
