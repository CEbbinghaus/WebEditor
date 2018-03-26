window.onunload = () => {
    BowserStorage.save();
}
window.onbeforeunload = () => {
    BowserStorage.backUp()
}