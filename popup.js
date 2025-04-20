document.getElementById("fetchBtn").addEventListener("click", async () => {
    const handle = document.getElementById("handle").value.trim();
    const statusDiv = document.getElementById("status");
    const list = document.getElementById("problemList");
    list.innerHTML = "";
    statusDiv.textContent = "Fetching data...";
  
    if (!handle) {
      statusDiv.textContent = "Please enter a handle.";
      return;
    }
  
    try {
      // Get all submissions of the user
      const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      const data = await res.json();
  
      if (data.status !== "OK") {
        statusDiv.textContent = "No User Found";
        return;
      }
  
      const submissions = data.result;
      const unsolvedMap = {};
  
      // Process submissions
      for (let s of submissions) {
        const key = `${s.problem.contestId}-${s.problem.index}`;
  
        if (s.verdict === "OK") {
          delete unsolvedMap[key]; // Solved — remove it
        } else {
          if (!unsolvedMap[key]) {
            unsolvedMap[key] = s.problem;
          }
        }
      }
  
      const problems = Object.values(unsolvedMap);
  
      // Fetch all problem difficulties
      const probSet = await fetch("https://codeforces.com/api/problemset.problems");
      const probData = await probSet.json();
      const difficultyMap = {};
  
      for (let p of probData.result.problems) {
        const key = `${p.contestId}-${p.index}`;
        if (p.rating) {
          difficultyMap[key] = p.rating;
        }
      }
  
      // Sort problems by difficulty
      problems.sort((a, b) => {
        const diffA = difficultyMap[`${a.contestId}-${a.index}`] || 9999;
        const diffB = difficultyMap[`${b.contestId}-${b.index}`] || 9999;
        return diffA - diffB;
      });
  
      // Display
      if (problems.length === 0) {
        statusDiv.textContent = "Congrats! No unsolved attempts.";
        return;
      }
  
      statusDiv.textContent = `Found ${problems.length} problems`;
  
      for (let prob of problems) {
        const link = `https://codeforces.com/contest/${prob.contestId}/problem/${prob.index}`;
        const rating = difficultyMap[`${prob.contestId}-${prob.index}`] || "N/A";
  
        const li = document.createElement("li");
        li.innerHTML = `<a href="${link}" target="_blank">${prob.name} [${rating}]</a>`;
        list.appendChild(li);
      }
  
    } catch (err) {
      statusDiv.textContent = "Failed to fetch. Check network or handle.";
    }
  });
  