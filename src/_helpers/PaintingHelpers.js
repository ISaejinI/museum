const TYPE_LABELS = {
    "painting": "Peinture",
    "woodblock print": "Estampe",
    "fresco": "Fresque",
    "triptych": "Triptyque",
    "mural": "Peinture murale",
};

export function paintingTypeLabel(type) {
    return TYPE_LABELS[type] ?? type;
};
