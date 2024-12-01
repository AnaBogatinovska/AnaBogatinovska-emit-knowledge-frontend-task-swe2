<template>
    <div class="form-builder">
        <div class="header">
            <h1>Dynamic Form Builder</h1>
            <button @click="addField" class="btn-primary">
                <span class="icon">+</span> Add New Field
            </button>
        </div>

        <div class="builder-container" v-if="formFields.length">
            <div class="fields-panel">
                <div v-for="(field, index) in formFields" :key="field.id" class="field-card">
                    <FormField :field="field" :all-fields="formFields" @update:field="updateField(index, $event)"
                        @remove="removeField(index)" />
                </div>
            </div>

            <div v-if="formFields.length" class="preview-panel">
                <h2>Form Preview</h2>
                <form @submit.prevent="handleSubmit" class="preview-form">
                    <div v-for="field in formFields" :key="field.id" class="preview-field">
                        <label :for="field.id">
                            {{ field.label }}
                            <span v-if="field.required" class="required">*</span>
                        </label>

                        <template v-if="field.type === 'select'">
                            <select :id="field.id" v-model="formData[field.name]" :required="field.required"
                                class="form-control">
                                <option value="">Select an option</option>
                                <option v-for="option in field.options" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </template>

                        <template v-else>
                            <input :id="field.id" v-model="formData[field.name]" :type="field.type"
                                :required="field.required" class="form-control">
                        </template>
                    </div>

                    <button type="submit" class="btn-submit">Submit Form</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import FormField from '../components/dynamic-form/FormField.vue'
import { generateUniqueId } from '../utils/helpers'

export default {
    name: 'DynamicFormBuilder',
    components: {
        FormField
    },
    data() {
        return {
            formFields: [],
            formData: {}
        }
    },
    methods: {
        addField() {
            this.formFields.push({
                id: generateUniqueId(),
                type: 'text',
                label: '',
                name: '',
                required: false,
                options: [],
            })
        },
        removeField(index) {
            this.formFields.splice(index, 1)
        },
        updateField(index, updatedField) {
            this.formFields[index] = { ...updatedField }
        },
        handleSubmit() {
            console.log('Form Data:', this.formData)
        }
    }
}
</script>

<style scoped>
.form-builder {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    background: #f4faff;
    border-radius: 15px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    font-family: 'Inter', sans-serif;
}

/* Header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #34495e;
}

.header .btn-primary {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background: linear-gradient(145deg, #007bff, #0056b3);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.header .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0px 8px 16px rgba(0, 123, 255, 0.3);
}

/* Builder Container */
.builder-container {
    display: flex;
    gap: 2rem;
}

/* Fields Panel */
.fields-panel {
    flex: 1;
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    max-height: 400px;
}

.field-card {
    background: #f9f9f9;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.field-card:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

/* Preview Panel */
.preview-panel {
    flex: 1;
    background: #ffffff;
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-panel h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #34495e;
    margin-bottom: 1rem;
}

.preview-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.preview-field label {
    font-size: 1rem;
    font-weight: 600;
    color: #555;
    display: block;
    margin-bottom: 0.5rem;
}

.preview-field .required {
    color: #dc3545;
}

.preview-field input,
.preview-field select {
    padding: 0.75rem;
    font-size: 1rem;
    border: 2px solid #cce7ff;
    border-radius: 10px;
    background: #ffffff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.preview-field input:focus,
.preview-field select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.btn-submit {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background: linear-gradient(145deg, #28a745, #218838);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0px 8px 16px rgba(40, 167, 69, 0.3);
}
</style>