const faqData = [
    {
        Question: "How do I login?",
        Answer: "Use your username and password",
    },
    {
        Question: "How do I report a problem?",
        Answer: "Submit a ticket",
    },
    {
        Question: "How many self-certified ec's do I get?",
        Answer: "You get 3 per academic year",
    },
];

const getFaqData = () => {
    const storedData = localStorage.getItem("faqData");
    return storedData ? JSON.parse(storedData) : faqData;
};

export default getFaqData;