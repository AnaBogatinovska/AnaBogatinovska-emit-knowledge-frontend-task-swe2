<template>
    <div class="form-builder">
        <div class="header">
            <h1>Dynamic Form Builder</h1>
            <button @click="addField" class="btn-primary">
                <span class="icon">+</span> Add New Field
            </button>
        </div>

        <div class="builder-container" v-if="formFields.length" >
            <div class="fields-panel">
                <div v-for="(field, index) in formFields" :key="field.id" class="field-card">
                    <FormField :field="field" :all-fields="formFields" @update:field="updateField(index, $event)"
                        @remove="removeField(index)" />
                </div>
            </div>

            <div v-if="formFields.length" class="preview-panel">
                <h2>Form Preview</h2>
                <form @submit.prevent="handleSubmit" class="preview-form">
                    <div v-for="field in formFields" :key="field.id" v-show="shouldShowField(field)"
                        class="preview-field">
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
    padding: 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.builder-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.fields-panel,
.preview-panel {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.field-card {
    margin-bottom: 1.5rem;
}

.btn-primary {
    background: #4361ee;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: background 0.3s ease;
}

.btn-primary:hover {
    background: #3651d4;
}

.btn-submit {
    background: #2ecc71;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    font-weight: 500;
    margin-top: 1.5rem;
    transition: background 0.3s ease;
}

.btn-submit:hover {
    background: #27ae60;
}

.form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin-top: 0.5rem;
}

.required {
    color: #e74c3c;
    margin-left: 4px;
}

.preview-field {
    margin-bottom: 1.5rem;
}

.preview-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

h1 {
    font-size: 1.8rem;
    color: #2c3e50;
}

h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
}
</style>