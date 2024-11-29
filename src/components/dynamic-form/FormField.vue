<template>
    <div v-if="field.visible" class="form-field">
        <label :for="field.id" class="field-label">{{ field.label }} {{ field.validation.required ? '*' : '' }}</label>

        <div class="long" style="display: flex;">
            <!-- Text Field -->
            <input v-if="field.type === 'text'" :id="field.id" type="text" v-model="localValue"
                :placeholder="field.placeholder" class="field-input" />

            <!-- Number Field -->
            <input v-if="field.type === 'number'" :id="field.id" type="number" v-model.number="localValue"
                :min="field.min" :max="field.max" class="field-input" />

            <!-- Dropdown Field -->
            <select v-if="field.type === 'dropdown'" :id="field.id" v-model="localValue" class="field-select">
                <option value="">Select an option</option>
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
        </div>

        <!-- Checkbox Field -->
        <input v-if="field.type === 'checkbox'" :id="field.id" type="checkbox" v-model="localValue"
            class="field-checkbox" />

        <div v-if="errors.length" class="field-errors">
            <p v-for="error in errors" :key="error" class="error-message">{{ error }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormField',
    props: {
        field: {
            type: Object,
            required: true
        },
        modelValue: {
            type: [String, Number, Boolean],
            default: null
        }
    },
    data() {
        return {
            errors: []
        }
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
                this.validate()
            }
        }
    },
    methods: {
        validate() {
            this.errors = []; 
            const fieldErrors = this.field.validate();
            if (fieldErrors.length > 0 && !this.localValue) {
                this.errors = fieldErrors;
            }
        },
        showErrors(errors) {
            this.errors = errors;
        },
        clearErrors() {
            this.errors = [];
        }
    }
}
</script>

<style scoped>
.form-field {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.field-label {
    display: block;
    font-size: 1rem;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 8px;
}

.form-field .long {
    display: flex;
    width: 100%;
}

.form-field .long .field-input,
.form-field .long .field-select {
    flex: 1;
}

.field-input,
.field-select {
    padding: 10px;
    border: 1px solid #dfe3e8;
    border-radius: 5px;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;
}

.field-input:focus,
.field-select:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 4px rgba(52, 152, 219, 0.4);
}

.field-checkbox {
    margin-right: 8px;
}

.field-errors {
    margin-top: 8px;
    color: #e74c3c;
}

.error-message {
    font-size: 0.9rem;
    margin: 0;
}

.field-input::placeholder {
    color: #bdc3c7;
    font-style: italic;
}
</style>