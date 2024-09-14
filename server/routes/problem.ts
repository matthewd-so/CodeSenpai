import express from "express";

const problem = express.Router();

problem.post("/all", async (req, res) => {
    const { id } = req.body;
    const search = String(req.query.search || ""); // Ensure it's a string
    const difficulty = String(req.query.difficulty || ""); // Ensure it's a string
    const acceptance = String(req.query.acceptance || ""); // Ensure it's a string
    const title = String(req.query.title || ""); // Ensure it's a string

    // Hard-coded problems array
    const allProblems = [
        {
            main: {
                id: 1,
                name: "two-sum",
                difficulty: "easy",
                acceptance_rate_count: 85,
                like_count: 200,
                dislike_count: 5,
                status: "",
            },
        },
        {
            main: {
                id: 2,
                name: "add-two-numbers",
                difficulty: "medium",
                acceptance_rate_count: 70,
                like_count: 150,
                dislike_count: 10,
                status: "",
            },
        },
        {
            main: {
                id: 3,
                name: "longest-substring-without-repeating-characters",
                difficulty: "hard",
                acceptance_rate_count: 50,
                like_count: 300,
                dislike_count: 20,
                status: "",
            },
        },
    ];

    try {
        // Apply search filter (if any)
        let filteredProblems = allProblems.filter((problem) =>
            problem.main.name.toLowerCase().includes(search.toLowerCase())
        );

        // Apply difficulty filter (if any)
        if (difficulty) {
            filteredProblems = filteredProblems.filter(
                (problem) => problem.main.difficulty === difficulty
            );
        }

        // Apply title filter (if any)
        if (title) {
            filteredProblems = filteredProblems.filter((problem) =>
                problem.main.name.toLowerCase().includes(title.toLowerCase())
            );
        }

        // Simulate user problem-solving status
        const user = {
            problems_solved: ["two-sum"],
            problems_attempted: ["add-two-numbers"],
        };

        // Apply problem-solving status (solved/attempted) to each problem
        filteredProblems = filteredProblems.map((problem) => {
            if (user.problems_solved.includes(problem.main.name)) {
                problem.main.status = "solved";
            } else if (user.problems_attempted.includes(problem.main.name)) {
                problem.main.status = "attempted";
            }
            return problem;
        });

        // Return the filtered and sorted problems
        res.json(filteredProblems);
    } catch (e) {
        console.log(e);
        res.json({ success: false, message: "Internal Server Error" });
    }
});

export default problem;
