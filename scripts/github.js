async function getRepoContents(path="", owner="mm4096", repo="games") {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        const response = await fetch(url, {  });
        if (!response.ok) {
            console.error(`GitHub API responded with ${response.status}`);
        }
        return await response.json()

    } catch (error) {
        console.error('Error fetching repository contents:', error);
    }
}

async function downloadFile(path, owner="mm4096", repo="games") {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        const response = await fetch(url, {  });
        if (!response.ok) {
            console.error(`GitHub API responded with ${response.status}`);
        }
        const file = await response.json();
        console.log(file)
        const downloadUrl = file.download_url;
        window.open(downloadUrl, '');

    } catch (error) {
        console.error('Error fetching repository contents:', error);
    }
}