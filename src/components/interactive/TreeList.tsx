import { useState, useCallback } from "react";
import "./TreeList.css";

export interface TreeNode {
  id: string;
  label: string;
  selectable?: boolean;
  children?: TreeNode[];
}

interface TreeListProps {
  nodes: TreeNode[];
  selected?: Set<string>;
  onSelectionChange?: (selected: Set<string>) => void;
  defaultExpanded?: Set<string>;
}

export function TreeList({ nodes, selected, onSelectionChange, defaultExpanded }: TreeListProps) {
  const [expanded, setExpanded] = useState<Set<string>>(defaultExpanded ?? new Set());
  const [internalSelected, setInternalSelected] = useState<Set<string>>(new Set());

  const sel = selected ?? internalSelected;
  const setSel = onSelectionChange ?? setInternalSelected;

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelect = useCallback(
    (id: string) => {
      const next = new Set(sel);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSel(next);
    },
    [sel, setSel],
  );

  return (
    <div className="treelist">
      {nodes.map((node) => (
        <TreeListNode
          key={node.id}
          node={node}
          depth={0}
          expanded={expanded}
          selected={sel}
          onToggleExpand={toggleExpand}
          onToggleSelect={toggleSelect}
        />
      ))}
    </div>
  );
}

interface TreeListNodeProps {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  selected: Set<string>;
  onToggleExpand: (id: string) => void;
  onToggleSelect: (id: string) => void;
}

function TreeListNode({ node, depth, expanded, selected, onToggleExpand, onToggleSelect }: TreeListNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected.has(node.id);

  return (
    <div className="treelist-branch">
      <div
        className="treelist-row"
        style={{ paddingLeft: 12 + depth * 20 }}
      >
        {/* Expand/collapse arrow */}
        {hasChildren ? (
          <button
            className={`treelist-arrow ${isExpanded ? "treelist-arrow--open" : ""}`}
            onClick={() => onToggleExpand(node.id)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 1.5L7 5L3 8.5" />
            </svg>
          </button>
        ) : (
          <span className="treelist-arrow-spacer" />
        )}

        {/* Optional checkbox */}
        {node.selectable !== false && (
          <span
            className={`treelist-check ${isSelected ? "treelist-check--on" : ""}`}
            onClick={() => onToggleSelect(node.id)}
            role="checkbox"
            aria-checked={isSelected}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onToggleSelect(node.id);
              }
            }}
          >
            {isSelected && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 3.5L3.5 6L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
        )}

        {/* Label */}
        <span
          className="treelist-label"
          onClick={() => {
            if (hasChildren) onToggleExpand(node.id);
          }}
          style={{ cursor: hasChildren ? "pointer" : "default" }}
        >
          {node.label}
        </span>
      </div>

      {/* Children (animated) */}
      {hasChildren && (
        <div className={`treelist-children ${isExpanded ? "treelist-children--open" : ""}`}>
          {node.children!.map((child) => (
            <TreeListNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selected={selected}
              onToggleExpand={onToggleExpand}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
