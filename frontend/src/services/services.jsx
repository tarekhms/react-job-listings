const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
    });
    return;
};

const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
    });
    return;
};

const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
    });
    return;
};


export { addJob, updateJob, deleteJob }