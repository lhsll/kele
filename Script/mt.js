let obj = JSON.parse($response.body);

if ($request.url.indexOf('/backend-api/models') !== -1 && obj && obj.models) {
    obj.models = obj.models.map(m => {
        m.tags = m.tags.filter(t => {
            return t !== 'mobile';
        });
        if (m.slug === 'gpt-4-mobile') {
            obj.categories.push({
                browsing_model: null,
                category: "gpt_4",
                code_interpreter_model: null,
                default_model: "gpt-4-mobile",
                human_category_name: "GPT-4-Mobile",
                plugins_model: null,
                subscription_level: "plus",
            });
        }
        return m;
    });
}

$done({body: JSON.stringify(obj)});