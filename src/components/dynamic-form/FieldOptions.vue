<template>
    <div class="field-options">
        <h4>Dropdown Options</h4>
        <div v-for="(option, index) in options" :key="index" class="option-row">
            <input type="text" v-model="options[index].label" placeholder="Option Label" class="option-input" />
            <input type="text" v-model="options[index].value" placeholder="Option Value" class="option-input" />
            <button @click="removeOption(index)" class="remove-option-btn">Remove</button>
        </div>
        <button @click="addOption" class="add-option-btn">Add Option</button>
    </div>
</template>

<script>
export default {
    name: 'FieldOptions',
    props: {
        modelValue: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            options: this.modelValue
        }
    },
    watch: {
        options: {
            handler(newOptions) {
                this.$emit('update:options', newOptions)
            },
            deep: true
        }
    },
    methods: {
        addOption() {
            this.options.push({ label: '', value: '' })
        },
        removeOption(index) {
            this.options.splice(index, 1)
        }
    }
}
</script>

<style scoped>
.field-options {
    margin-top: 1rem;
    background: #f9f9f9;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.field-options h4 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #555;
    margin-bottom: 1rem;
}

.option-row {
    margin-bottom: 1rem;
}

.option-input {
    flex: 1;
    padding: 0.5rem;
    font-size: 1rem;
    border: 2px solid #cce7ff;
    border-radius: 5px;
    background: #ffffff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    margin-bottom: 1em;
}

.option-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

.remove-option-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.remove-option-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(220, 53, 69, 0.3);
}

.add-option-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.add-option-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 123, 255, 0.3);
}
</style>
