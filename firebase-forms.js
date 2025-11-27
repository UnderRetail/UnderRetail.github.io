// REAL Firebase Form Handlers
async function submitContactForm(formData) {
    try {
        await db.collection('contacts').add({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            message: formData.message,
            timestamp: new Date(),
            status: 'new'
        });
        console.log('Contact form saved to Firebase!');
        return true;
    } catch (error) {
        console.error('Contact form error:', error);
        return false;
    }
}

async function submitInvestmentApplication(formData) {
    try {
        const applicationId = 'APP' + Date.now();
        
        await db.collection('applications').add({
            applicationId: applicationId,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            tier: formData.tier,
            amount: parseFloat(formData.amount),
            timestamp: new Date(),
            status: 'under_review'
        });
        
        console.log('Application saved to Firebase! ID:', applicationId);
        return applicationId;
    } catch (error) {
        console.error('Application error:', error);
        return null;
    }
}
