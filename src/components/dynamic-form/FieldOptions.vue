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
    margin-top: 15px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #f8f9fa;
}

.option-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.option-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

.add-option-btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
}

.add-option-btn:hover {
    background-color: #45a049;
}

.remove-option-btn {
    background-color: #ff4444;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
}

.remove-option-btn:hover {
    background-color: #ff3333;
}
</style>